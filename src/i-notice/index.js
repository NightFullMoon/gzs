import Vue from "vue"
import iNotice from './i-notice.vue'

/**
 * 显示一条通知
 * @param {String} content - 通知的内容
 * @param {Object} [options={}] - 通知的参数对象，详情参考组件的props
 */
let notice = function (content, options = {}) {

    let vueObject = new Vue({
        data: { show: false },
        render: function (createElement) {
            let that = this;
            return createElement(iNotice, {
                props: {
                    content,
                    show: that.show,
                    ...options,
                },
                on: {
                    "update:show": function (show) {
                        // console.log(data);
                        that.show = show;
                    }
                }

            });
        },
        mounted: function () {
            this.show = true;
        }
    });

    const component = vueObject.$mount();
    document.body.appendChild(component.$el);
}

export default notice;