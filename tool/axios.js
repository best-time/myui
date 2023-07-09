import axios, { AxiosRequestConfig } from 'axios';
// axios小程序适配器
import adapter from 'axios-miniprogram-adapter';
// 存储请求url
let requestList = new Set();

//@ts-ignore
axios.defaults.adapter = adapter;

const $http = axios.create({
    // 请求URL前缀
    baseURL: '/',
    // 请求超时时间设置为20s
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// 添加【请求】拦截器
$http.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 序列化后的 JSON 字符串
        config.data = JSON.stringify(config.data);
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${uni.getStorageSync('token')}`;

        // 利用cancelToken 取消当次请求
        config.cancelToken = new axios.CancelToken(c => {
            const method = config.method?.toLocaleLowerCase();
            if (method === 'post' || method === 'put') {
                // 在这里阻止重复请求，上个请求未完成时，相同的请求不会再次执行
                requestList.has(`${config.url}`) ? c(`${config.url}---重复请求被中断`) : requestList.add(`${config.url}`);
            }
        });
        return config;
    },
    () => {
        // 对请求错误做些什么
        return Promise.reject();
    }
);


// 添加【响应】拦截器
$http.interceptors.response.use(
    // 对响应数据做点什么
    response => {
        // 相同请求不得在2秒内重复发送，反之继续执行
        setTimeout(() => {
            response?.config?.url && requestList.delete(response.config.url);
        }, 2000);
        // 返回response的data值
        return response.data;
    },

    // 对响应错误做点什么
    error => {
        if (error?.response?.status === 401) {
            console.log('401');
        }

        // 请求如果失败了，务必从列表里面删掉，否则请求拦截器会取消请求
        error?.config?.url && requestList.delete(error.config.url);
        return Promise.reject(error?.response?.status);
    }
);
