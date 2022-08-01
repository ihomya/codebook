function animate(obj, target, callback) {
    // console.log(callback); callback = function(){}
    clearInterval(obj.timer);
    // if (obj.timer) { return; } 
    obj.timer = setInterval(() => {
        // 步长值写到定时器的里面
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        // 向前移动则向上取值，向后移动则向下取整
        var step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // console.log(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质停止计时器
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            /* if (callback) {
                // 调用函数
                callback();
            } */
            callback && callback(); // 逻辑中断
        }
        // 把每次移动的距离改为 一个慢慢变小的值
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 15);

}
