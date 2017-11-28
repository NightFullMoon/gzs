import Vue from "vue"
import iNotice from './i-notice.vue'




// 这个是直接调用的函数
// 调用示例：notice("标题");
// notice("标题","内容");
// notice(config);
var notice = function(text,content) {
    var _arg = {
        show: true
    };

    // 如果只有一个字符串参数，就视为通知的标题
    // 否则就将整个对象视为config对象传入
    if (1 == arguments.length) {
        if ("string" == typeof arguments[0]) {
            // debugger
            _arg.title = arguments[0];
        } else {
            _arg = arguments[1];
        }
    // 如果是两个参数，则第一个视为标题，第二个视为内容
    } else if (2 == arguments.length) {
        _arg.title = arguments[0];
        _arg.content = content;

    }

    // console.log("notice!");
    instance(_arg);
}

function instance(prop) {
    console.log(prop);
    var vueObj = new Vue({
        template:`<i-notice 
                :show.sync="show"
                :title="title"
                :content="content"
            ></i-notice>`,
        data: {
            show:false,
            title:prop.title,
            content:prop.content
        },
        components:{iNotice},
        mounted:function(){
            this.show = true;
        }
    });

    const component = vueObj.$mount();
    document.body.appendChild(component.$el);
}

export default notice;