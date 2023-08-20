window.addEventListener('load', function () {
    // 1. 获取\元素
    let bannerImgs = this.document.querySelector('.banner-imgs')
    let imgWidth = this.document.querySelector('.container').offsetWidth;
    let bannerPre = this.document.querySelector('.pre')
    let bannerNext = this.document.querySelector('.next');
    let bannerPoint = this.document.querySelector('.point');
    // 2. 添加第一张图到容器最后 实现无缝滚动
    let img = bannerImgs.children[0].cloneNode(true);
    bannerImgs.appendChild(img);
    // 3. 添加对应数量的原点
    for (let i = 0; i < bannerImgs.children.length - 1; i++) {
        // 创建节点
        let li = this.document.createElement('li');
        bannerPoint.appendChild(li);
        li.addEventListener('click', function () {
            if (!flag) { return; }
            flag = false;
            imgIndex = i;
            pointIndex = i;
            onlyCurrent(imgList, imgIndex);
            onlyCurrent(pointList, pointIndex)
            animate(bannerImgs, -imgWidth * imgIndex, function () {
                flag = true;
            });
        })
    }
    // 4.默认显示第三张
    let imgIndex = 2; // 当前显示图片索引值
    let pointIndex = 2; // 原点索引值
    let imgList = bannerImgs.children;
    let pointList = bannerPoint.children;
    let flag = true;    // 节气阀
    bannerImgs.style.left = -imgIndex * imgWidth + 'px';
    bannerImgs.children[imgIndex].className = 'current';
    bannerPoint.children[pointIndex].className = 'current';


    /* 上一张 点击事件 */
    bannerPre.addEventListener('click', function () {
        if (!flag) { return; }
        flag = false;
        // 当处于第一张图片时，先移动到最后一张 然后在向前移动
        if (imgIndex == 0) {
            bannerImgs.style.left = -imgWidth * (imgList.length - 1) + 'px';
            imgIndex = imgList.length - 1;
        }
        imgIndex--; // 最大值和pointIndex相同 5-1
        pointIndex = imgIndex
        /* // if (pointIndex == 0) {
        //     pointIndex = pointList.length - 1;
        // } else {
        //     pointIndex--;

        // }
        // console.log(imgIndex);
        // console.log(pointIndex); */

        onlyCurrent(imgList, imgIndex);
        onlyCurrent(pointList, pointIndex);
        animate(bannerImgs, -imgWidth * imgIndex, function () {
            flag = true;
        });
    })
    /* 下一张 点击事件 */
    bannerNext.addEventListener('click', function () {
        if (!flag) { return; }
        flag = false;
        // 当处于最后一张图片时，先移动到第一张 然后在向后移动
        if (imgIndex == imgList.length - 1) {
            bannerImgs.style.left = 0;
            imgIndex = 0;
        }
        imgIndex++;
        pointIndex++;
        if (pointIndex > pointList.length - 1) {
            pointIndex = 0;
        }
        // console.log(imgIndex);
        // console.log(pointIndex);
        onlyCurrent(imgList, imgIndex);
        onlyCurrent(pointList, pointIndex)
        animate(bannerImgs, -imgWidth * imgIndex, function () {
            flag = true;
        });
    })

    // 小圆点 点击事件
    for (let i = 0; i < pointList.length; i++) {
        pointList[i].addEventListener('click', function () {
            if (!flag) { return; }
            flag = false;
            imgIndex = i;
            pointIndex = i;
            onlyCurrent(imgList, imgIndex);
            onlyCurrent(pointList, pointIndex)
            animate(bannerImgs, -imgWidth * imgIndex, function () {
                flag = true;
            });
        })
    }

    var timer = this.setInterval(function () {
        bannerNext.click();
    }, 2000)
    bannerImgs.addEventListener('mouseover', function () {
        clearInterval(timer)
        timer = null;
    })
    bannerImgs.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            bannerNext.click();
        }, 2000)
    })
    /**
     * banner点击事件
     * 
     */
    /*     function bannerButtonClickEvent(ele) {
            if (flag) {
                flag = false;
                switch (ele) {
                    case bannerPre:
                        if (imgIndex == 0) {
                            bannerImgs.style.left = -imgWidth * (imgList.length - 1) + 'px';
                            imgIndex = imgList.length - 1;
                        }
                        imgIndex--; // 最大值和pointIndex相同 5-1
                        pointIndex = imgIndex
                        break;
                    case bannerNext:
                        // 当处于最后一张图片时，先移动到第一张 然后在向后移动
                        if (imgIndex == imgList.length - 1) {
                            bannerImgs.style.left = 0;
                            imgIndex = 0;
                        }
                        imgIndex++;
                        pointIndex++;
                        if (pointIndex > pointList.length - 1) {
                            pointIndex = 0;
                        }
                        break;
                }
                animate(bannerImgs, -imgWidth * imgIndex, function () {
                    flag = true;
                });
                onlyCurrent(imgList, imgIndex);
                onlyCurrent(pointList, pointIndex)
            }
            return;
        }
     */






    /**
    *   自动切换
    *   @param {Element} ele 目标元素
    **/
    function autoplay(ele) {
        bannerNext.onclick();
    }

    /**
     * 元素移动动画
     * @param {Element} ele 目标元素
     * @param {number} target 目标位置
     * @param {Function} callback 回调函数
     */
    function animate(ele, target, callback) {
        // 清除原有计时器
        clearInterval(ele.timer);
        ele.timer = setInterval(function () {
            // 步长：每次移动的长度，分10次移动
            let step = (target - ele.offsetLeft) / 10;
            // 向前移动则向上取值，向后移动则向下取整
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            // 判断下一步是否越界 
            if (ele.offsetLeft == target) {
                // 越界 则清除计时器
                clearInterval(ele.timer)
                // ele.style.left = target + 'px';
                // 执行回调函数
                callback && callback(); // 存在则执行
            } else {
                // 未越界 则继续移动
                ele.style.left = ele.offsetLeft + step + 'px';
            }
        }, 30)
    }
    /**
     * 排他算法 
     * */
    function onlyCurrent(nodeList, index) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].className = "";
        }
        nodeList[index].className = "current";
    }
})