import iNotice from './i-notice.vue'

// 这个是直接调用的函数
var notice = function(text) {
    var _main = "";
    var _text = "";
}

function instance(prop) {
    var vueObj = new Vue({
        data: {},
        render: (h) => h(iNotice, prop)
    });

    const component = vueObj.$mount();
    document.body.appendChild(component.$el);
}

export default iNotice;