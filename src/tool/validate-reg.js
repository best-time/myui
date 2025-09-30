import { regTest } from '@/libs/tools'
// 整数校验
export const intValidate = (rule, value, callback) => {
    if (value % 1 !== 0) {
        callback(new Error("请输入整数"));
    } else {
        callback();
    }
};
// 数组中每个都要有值
export const arrValueValidate = (rule, value, callback) => {
    let res = value.every(item => {
        return item;
    });
    if (res) {
        callback();
    } else {
        callback(new Error("请输入内容"));
    }
};
// 校验https协议地址
export const urlValidate = (rule, value, callback) => {
    if (!value || /^(HTTPS|https):\/\/([\w.]+\/?)\S*/.test(value)) {
        return callback();
    } else {
        return callback(new Error("请输入完整的URL地址(含https)"));
    }
};

// 仅限字母（Alphabetic）、符号（characters）、汉字（Chinese）
// 即不能输入数字
export const accValid = (rule, value, callback) => {
    if (/\d+/.test(value)) {
        callback(new Error("支持字母、符号、汉字"));
    } else {
        callback();
    }
};
// 仅限英文分号（如果输入中文分号给提示）
export const ENcommaValid = (rule, value, callback) => {
    if (/；+/.test(value)) {
        callback(new Error("请使用英文分号间隔"));
    } else {
        callback();
    }
};
// 仅限英文分号（如果输入中文分号给提示）；每个最多10个字；最多10个标签
export const ENcommaValidTen = (rule, value, callback) => {
    if (/；+/.test(value)) {
        callback(new Error("请使用英文分号间隔"));
    } else {
        let arr = value.split(";");
        if (arr.length > 10) {
            callback(new Error("最多10个标签"));
        }
        for (let val of arr) {
            if (val.length > 10) {
                callback(new Error("每个标签最多10个字"));
            }
        }
        callback();
    }
};
// 手机号&座机校验
export const phoneValid = (rule, value, callback) => {
    if(regTest(value, rule.regType)) callback()
    else callback(new Error('输入正确的格式'))
}

// 仅限字母（Alphabetic）、符号（characters）、数字（num）
// 即不能输入汉字
export const  acnValid = (rule, value, callback) => {
    if (/[\u4E00-\u9FA5]/.test(value)) {
        callback(new Error("支持字母、数字、符号"));
    }else {
        callback();
    }
}
// 仅限字母（英文）（Alphabetic）、数字（number）、汉字（Chinese）
// 即不能输入数字
export const  ancValid = (rule, value, callback) => {
    if (/^[\u4e00-\u9fa5a-zA-Z0-9]*$/.test(value)) {
        callback();
    }else {
        callback(new Error("支持中文、英文、数字"));
    }
}
// 非空数组
export const  validEmptyArray = (rule, value, callback) => {
    if(value.length===0 || value.join('').length===0){
        callback(new Error(rule.msg));
    }else{
        callback();
    }
}
