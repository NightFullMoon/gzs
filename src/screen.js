export default {
    isOnM:function (params) {
        return window.screen.width <= 639;
    },
    isOnPC:function (params) {
        return 640 <= window.screen.width;
    }
}