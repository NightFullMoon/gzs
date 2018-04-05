import Vue from 'vue'
// import App from './App.vue'

import "./common.less"

import iButton from './i-button.vue'
import iSwitch from './i-switch.vue'
import iInput from './i-input.vue'
import iList from './i-list/i-list.vue'
import iListItem from './i-list/i-list-item.vue'

import iRadioList from './i-radio-list.vue'
import iMultList from './i-mult-list.vue'

import iTabs from './i-tabs/i-tabs.vue'
import iTabPane from './i-tabs/i-tab-pane.vue'

import iRadio from './i-radio.vue'

import iMenu from './i-menu.vue'
import iSelect from './i-select.vue'

import iBottomMenu from './i-bottom-menu.vue'
// import iDialog from './i-dialog.vue'

import iBottomNav from './i-bottom-nav.vue'
import notice from './i-notice/'
import alert from './i-alert/'

import iAutoComplete from "./i-auto-complete.vue"

import iMessage from "./i-message/i-message.vue";
import message from "./i-message/";

message("这是一个消息提示");

let gzs = {
    iButton,
    iSwitch,
    iInput,
    iList,
    iListItem,
    iRadioList,
    iMultList,
    iTabs,
    iTabPane,
    iRadio,
    iMenu,
    iSelect,
    iBottomMenu,
    // iDialog,
    iBottomNav,
    // iNotice
    iAutoComplete,
    iMessage
}

// Vue.use 需要，
// 详情参考https://cn.vuejs.org/v2/api/#Vue-use
// 以及https://cn.vuejs.org/v2/guide/plugins.html
const install = function (Vue, opts = {}) {
    for (var i in gzs) {
        Vue.component(i, gzs[i]);
    }

    Vue.prototype.$notice = notice;
    Vue.prototype.$alert = alert;
};

// 直接引用脚本的情况,要是Vue存在就直接注册给Vue
// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}


export default install