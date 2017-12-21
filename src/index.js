import Vue from 'vue'

import gzs from './gzs.js'
import testC from "./test-c.vue"

console.log(gzs);
Vue.use(gzs);

new Vue({
    el: '#app',
    components: {
        testC
    },
    data: {
        sw: true,
        foo: "aaa",
        list: [1, 2, 3, {
            label: "link",
            href: "/a.html",
            disabled: true,
            aaa: 1
        }],

        // 自定义渲染的列表
        customList: [{
                label: "测试"
            }, {
                label: "快速开始",
                href: "./doc-cn/quick-start.html",
                // action: function() {}
            }, {
                label: "按钮 / Button ",
                href: "./doc-cn/i-button.html",
                // action: function() {}
            }, {
                label: "开关 / Switch",
                href: "./doc-cn/i-switch.html",
                icon: "fa-toggle-on"
            },
            // item完整的属性：
            {
                label: "测试的item",
                action: function () {
                    alert("可以自定义回调函数");
                },
                href: "###",
                icon: "fa-toggle-on",
                disabled: true
            }
        ],

        isShowMenu: false,
        isShowDialog: false,
        inputText: "",
        dialogSecondary: {
            label: "取消",
            // class: ["primary"],
            callback: function () {}
        },
        selectText: "",

        showNotice: false,
        text2: ""
    },
    watch: {
        sw: function () {
            console.log("sw change!:" + this.sw);
        },
        isShowMenu: function () {
            console.log("isShowMenu change!:" + this.isShowMenu);
        }
    },
    methods: {
        print(log) {
            // con'.log()
            console.log(log);
        },
        onAutoComplete: function (keyword) {
            console.log(keyword);
            // return ['aaa', 'bbb'];

            return new Promise(function (resolve) {
                console.log("new promise")
                setTimeout(function () {
                    resolve([keyword + 1, keyword + 2, keyword + 3]);
                }, 3000);
            })
        },
        onAutoComplete2: function (keyword) {
            return [keyword + new Date(), keyword + "2" + new Date()];
        }
    },
    mounted: function () {
        var that = this;

        // this.$notice();
        // this.$alert("只有标题标题标题");
        this.$alert({
            title: "标题",
            onClose: function () {
                console.log("接收到关闭事件");
            },
            buttons: [{
                label: "确定2",
                action: function () {
                    console.log("点击了确定2");
                    return false;
                }
            }, {
                label: "取消",
                className: ["a", "b"],
                action: function () {
                    console.log("点击了取消");
                    console.log(this);
                    this.close();
                }
            }]
        });

        setTimeout(function () {
            that.foo = "bbb";
        }, 3000);
    }
    // render: h => h(App)
});