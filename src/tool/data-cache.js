async function request() {}
(function () {
  const promiseCache = new Map();

  // 短时间多次调用此方法, 还是会多次调用接口(不能防重)
  function getData() {
    const key = "wares";
    let promise = promiseCache.get(key);
    // 当前promise缓存中没有 该promise
    if (!promise) {
      promise = request
        .get("/getWares")
        .then((res) => {
          // 对res 进行操作
        })
        .catch((error) => {
          // 在请求回来后，如果出现问题，把promise从cache中删除 以避免第二次请求继续出错S
          promiseCache.delete(key);
          return Promise.reject(error);
        });
      promiseCache.set(key, promise);
    }
    // 返回promise
    return promise;
  }
})();
(function () {
  const querys = {
    wares: "getWares",
    skus: "getSku",
  };
  const promiseCache = new Map();

  const queryAll = function async(queryApiName) {
    // 判断传入的数据是否是数组
    const queryIsArray = Array.isArray(queryApiName);
    // 统一化处理数据，无论是字符串还是数组均视为数组
    const apis = queryIsArray ? queryApiName : [queryApiName];

    // 获取所有的 请求服务
    const promiseApi = [];

    apis.forEach((api) => {
      // 利用promise
      let promise = promiseCache.get(api);

      if (promise) {
        // 如果 缓存中有，直接push
        promiseApi.push(promise);
      } else {
        promise = request
          .get(querys[api])
          .then((res) => {
            // 对res 进行操作
          })
          .catch((error) => {
            // 在请求回来后，如果出现问题，把promise从cache中删除
            promiseCache.delete(api);
            return Promise.reject(error);
          });
        promiseCache.set(api, promise);
        promiseApi.push(promise);
      }
    });
    return Promise.all(promiseApi).then((res) => {
      // 根据传入的 是字符串还是数组来返回数据，因为本身都是数组操作
      // 如果传入的是字符串，则需要取出操作
      return queryIsArray ? res : res[0];
    });
  };
})();
(function () {
  // 生成key值错误
  const generateKeyError = new Error(
    "Can't generate key from name and argument"
  );

  // 生成key值
  function generateKey(name, argument) {
    // 从arguments 中取得数据然后变为数组
    const params = Array.from(argument).join(",");

    try {
      // 返回 字符串，函数名 + 函数参数
      return `${name}:${params}`;
    } catch (_) {
      // 返回生成key错误
      return generateKeyError;
    }
  }

  class ItemCache {
    constructor(data, timeout) {
      this.data = data;
      // 设定超时时间，设定为多少秒
      this.timeout = timeout;
      // 创建对象时候的时间，大约设定为数据获得的时间
      this.cacheTime = new Date().getTime();
    }
  }

  class ExpiresCache {
    // 定义静态数据map来作为缓存池
    static cacheMap = new Map();

    // 数据是否超时
    static isOverTime(name) {
      const data = ExpiresCache.cacheMap.get(name);

      // 没有数据 一定超时
      if (!data) return true;

      // 获取系统当前时间戳
      const currentTime = new Date().getTime();

      // 获取当前时间与存储时间的过去的秒数
      const overTime = (currentTime - data.cacheTime) / 1000;

      // 如果过去的秒数大于当前的超时时间，也返回null让其去服务端取数据
      if (Math.abs(overTime) > data.timeout) {
        // 此代码可以没有，不会出现问题，但是如果有此代码，再次进入该方法就可以减少判断。
        ExpiresCache.cacheMap.delete(name);
        return true;
      }

      // 不超时
      return false;
    }

    // 当前data在 cache 中是否超时
    static has(name) {
      return !ExpiresCache.isOverTime(name);
    }

    // 删除 cache 中的 data
    static delete(name) {
      return ExpiresCache.cacheMap.delete(name);
    }

    // 获取
    static get(name) {
      const isDataOverTime = ExpiresCache.isOverTime(name);
      //如果 数据超时，返回null，但是没有超时，返回数据，而不是 ItemCache 对象
      if (!isDataOverTime) {
        return ExpiresCache.cacheMap.get(name).data;
      }
      return null;
    }

    // uniqKey: key值   data: 接口返回的数据   timeout: 默认存储20分钟
    // 默认存储20分钟
    static set(uniqKey, data, timeout = 1200) {
      // 设置 itemCache
      const itemCache = new ItemCache(data, timeout);
      //缓存
      ExpiresCache.cacheMap.set(uniqKey, itemCache);
    }
  }

  async function getWare(params1, params2) {
    // 生成key
    const key = generateKey("getWare", [params1, params2]);
    // 获得数据
    let data = ExpiresCache.get(key);
    if (!data) {
      const res = await request("/getWares", { params1, params2 });
      // 使用 10s 缓存，10s之后再次get就会 获取null 而从服务端继续请求
      ExpiresCache.set(key, res, 10);
    }
    return data;
  }

  //     getWares(1,2).then( ... )
  // // 第二次调用 取得先前的promise
  //     getWares(1,2).then( ... )
  // // 不同的参数，不取先前promise
  //     getWares(1,3).then( ... )
})();
(function () {})();
(function () {})();
(function () {})();
(function () {})();
