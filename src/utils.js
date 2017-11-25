var utils = {
    // 判断并返回一个对象是否是函数
    isFunction: function (obj) {
        return "function" == typeof obj;
    },

    // 判断并返回一个对象是否是一个Promise对象 
    isPromise: function (obj) {
        if (!obj) {
            return false;
        }

        return !!obj.then && utils.isFunction(obj.then);
    }
}

export default utils;