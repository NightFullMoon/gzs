import Vue from "vue"
import iNotice from './i-notice.vue'

// 这个是直接调用的函数
var notice = function(text) {
    var _arg = {
        show: true
    };
    if (1 == arguments.length) {
        if ("string" == typeof arguments[0]) {
            _arg.title = arguments[0];
        } else {
            _arg = arguments[1];
        }

    } else if (2 == arguments.length) {
        _arg.title = arguments[0];
        _arg.content = arguments[1];

    }

    console.log("notice!");
    instance({
        show: true,

    });
}

function instance(prop) {

    console.log(prop);

    var vueObj = new Vue({
        data: {},
        render: (h) => h(iNotice, {
            props: prop,
            on: {
                'update:show': function(vaule) {

                    debugger
                    console.log("change show");
                    prop.show = value;
                }
            }
        })
    });

    const component = vueObj.$mount();
    document.body.appendChild(component.$el);
}

export default notice;