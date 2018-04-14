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

/**
 * 创建一个按钮对象
 * @typedef {Object} buttonObject
 * @property {String} label - 按钮上显示的文本信息
 * @property {String[]} [className=[]] - 字符串数组，该数组中所有的元素都会被作为css类名添加到组件最外层的元素上
 * @property {Function} [action=function(){}] - 按钮被点击时触发的回调函数，在这个函数中，`this`指向的是`dialog对象`，因此可以通过`this`来调用dialog对象的接口；另外，默认情况下按钮在处理完回调事件后，**会自动关闭弹窗**，要阻止此行为，可以在回调函数中`return false`，然后调用`this.close();`来手动关闭弹窗;
 */

/**
 * 弹出一个弹窗
 * @param {String} arg - 弹窗的标题
 * @param {Object} arg - 配置对象
 * @param {String} [arg.title =""] - 弹窗的标题
 * @param {String} [arg.content = ""] - 弹窗的内容
 * @param {String[]} [arg.className = []] - String数组，该数组中所有的元素都会被作为css类名添加到组件最外层的元素上，可以借此来自定义主题或者覆盖掉默认样式
 * @param {Function} [arg.onClose = function(){}] - 当弹窗被关闭时，调用的回调函数
 * @param {buttonObject[]} [arg.buttons=[{label:"确定",className:["radius","primary"]}] - button对象数组，该数组中所有的元素都将会被转换成button元素添加到弹窗。如果不指定这个值，默认情况下会存在一个“确定”按钮
 */

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
                        // 没有传递action属性也是默认关闭
                        let shouldClose = element.action?element.action.call(dialog):true;

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