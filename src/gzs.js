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
import iDialog from './i-dialog.vue'

import iBottomNav from './i-bottom-nav.vue'

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
    iDialog,
    iBottomNav
}

for (var i in gzs) {
    Vue.component(i, gzs[i]);
}

export { gzs }