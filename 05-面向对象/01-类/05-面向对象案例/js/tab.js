/* 功能需求 */
/* 
    1. 点击tab栏可以切换
    2. 点击+号可以添加tab项和内容项
    3. 点击x号可以删除当前tab项和内容项
    4. 双击tab项可以修改编辑
    5. 双击内容项可以进行编辑
*/
var that;
class Tab {
    constructor(id) {
        that = this;
        // 获取元素
        this.main = document.querySelector(id);
        // 添加tab按钮
        this.add = this.main.querySelector('.tabadd');
        // 获取tab项父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        // section的父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
        // 是否处于编辑状态
        this.flag = false;
    }
    init() {
        this.updateNode();
        // init 初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i; // 自定义属性index 存储索引号
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    // 获取所有li和section
    updateNode() {
        // 所有tab项
        this.lis = document.querySelectorAll('li');
        // 所有内容项
        this.sections = document.querySelectorAll('section');
        // 所有关闭键
        this.remove = document.querySelectorAll('.icon-guanbi');
        // 所有li中的第一个span，tab项文本
        this.spans = document.querySelectorAll('.fisrstnav ul span:first-child');
    }
    // 1. 切换功能
    toggleTab() {
        // 这里的this指向的是每个li
        // console.log(this.index);
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive'
    }
    // 清除所有li和section的类
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2. 添加功能
    addTab() {
        that.clearClass();
        // (1) 创建li元素和section元素
        var random = Math.random();
        var li = '<li class="liactive"><span>新标签项</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试' + random + '</section>';
        // (2) 把两个元素追加的对应父元素里面
        that.ul.insertAdjacentHTML('beforeend', li); // 插入到ul里面的最后
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init(); // 为新建tab项初始化相关操作
    }
    // 3. 删除功能
    removeTab(e) {
        e.stopPropagation(); // 防止冒泡 触发li点击事件
        var index = this.parentNode.index;
        console.log(index);
        // 根据索引号删除对应li和section
        that.lis[index].remove(); // remove()方法可以直接删除指定元素
        that.sections[index].remove();
        that.init();
        // 当我们删除的不是选中状态的li，则原来选中状态的li保持不变
        if (document.querySelector('.liactive')) return;
        // 当我们删除了选中状态的这个li的适合，让前一个li处于选中状态 
        index === 0 ? index = 0 : index--; // 如果删除的是第一项且为选中状态，则保持第一个为选中状态
        that.lis[index] && that.lis[index].click(); // 手动调用点击事件
    }
    // 4. 修改功能
    editTab() {
        if (!that.flag) {
            that.flag = true;
            var str = this.innerHTML;
            // 双击禁用选定文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection().empty();
            this.innerHTML = '<input type="text" />';
            var input = this.children[0];
            input.value = str;
            input.select(); // 选中文本
            // 当失去焦点时 将文本框内容给span
            input.onblur = function () {
                this.parentNode.innerHTML = input.value;
            }
            // 当按下回车时自动调用失去焦点事件
            input.onkeyup = function (e) {
                if (e.keyCode === 13) {
                    this.blur();
                }
            }
        }
        that.flag = false;
    }
}
var tab = new Tab('#tab');