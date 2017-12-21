/* 
    最基础的调用：
    gzs.alert("Hi!");

    传递参数：

    gzs.alert({
        title:"标题",
        content:"内容",
        // 绑定在该弹窗上的css类名
        className: [],
        // 关闭时候的回调函数
        onClose:function(){},
        buttons:[{
                label:"确定",
                // 绑定在该按钮上的css类名
                className:[],
                // 点击按钮的事件，
                // 注：在这个函数中，this指向的是弹窗本身
                // 在按钮点击之后，默认会自动关闭，如果不希望自动关闭，
                // 可以通过返回false来阻止自动关闭，然后在函数中通过调用this.close()来主动关闭弹窗
                action:function(){}
            }]
    });
*/
import Vue from "vue"
import iDialog from "./i-dialog.vue"
import iButton from "../i-button.vue"




var Alert = function (arg) {

    // 根据按钮的参数和 createElement 函数，返回创建好的buttons对象，直接放置到render函数中去使用
    // 属于内部函数
    function CreateButtons(buttons, createElement) {
        // return null;
        return buttons.map(function (element) {
            return createElement(iButton, {
                class: [].concat(element.className),
                nativeOn: {
                    click: function () {

                        let dialog = vueObj.$refs.dialog;
                        let shouldClose = element.action.call(dialog);

                        if (false === shouldClose) {
                            return;
                        }
                        dialog.close();
                    }
                }
            }, element.label);
        })
    }

    let title = "string" === typeof arg ? arg : arg.title;

    var vueObj = new Vue({
        data: {
            show: true,
        },
        watch: {
            show: function () {
                arg.onClose && arg.onClose();
            }
        },
        render: function (createElement) {
            console.log("i-dialog");
            let that = this;
            var slotButtons = null;
            if (arg.buttons) {
                slotButtons = createElement("template", {
                    slot: "buttons"
                }, CreateButtons(arg.buttons, createElement))
            }

            return createElement(iDialog, {
                class: [].concat(arg.className),
                props: {
                    title: title,
                    content: arg.content || "",
                    value: that.show
                },
                on: {
                    input: function (value) {
                        that.show = value;
                    }
                },
                ref: "dialog"
            }, [slotButtons]);
        }
    });
    const component = vueObj.$mount();
    document.body.appendChild(component.$el);
}

export default Alert;