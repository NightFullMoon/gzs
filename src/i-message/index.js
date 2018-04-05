import Vue from "vue";
import iMessage from "./i-message.vue";

function message(msg) {

    let vueObject = new Vue({
        render: function (createElement) {
            return createElement(iMessage, msg);
        }
    });

    const component = vueObject.$mount();
    document.body.appendChild(component.$el);
}

export default message;