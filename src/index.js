import Vue from 'vue'

import gzs from './gzs.js'

console.log(gzs);
Vue.use(gzs);

new Vue({
    el: '#app',

    data: {
        sw: true,
        foo: "aaa",
        list: [1, 2, 3, { aaa: 1 }],
        isShowMenu: false,
        isShowDialog: false,
        inputText: "",
        dialogSecondary: {
            label: "取消",
            // class: ["primary"],
            callback: function() {}
        },
        selectText: "",

        showNotice: false
    },
    watch: {
        sw: function() {
            console.log("sw change!:" + this.sw);
        },
        isShowMenu: function() {
            console.log("isShowMenu change!:" + this.isShowMenu);
        }
    },
    methods: {
        print(log) {
            // con'.log()
            console.log(log);
        }
    },
    mounted: function() {
            var that = this;

            this.$notice();

            setTimeout(function() {
                that.foo = "bbb";
            }, 3000);
        }
        // render: h => h(App)

});