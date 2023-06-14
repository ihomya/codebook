window.onload = function () {
    var regtel = /^1[3|4|5|6|8]\d{9}$/; // 手机号正则表达式
    var regqq = /^[1-9]\d{4,}$/; // 10000
    var regnc = /^[\u4e00-\u9fa5]{2,8}$/; // 中文昵称正则表达式
    var regmsg = /^\d{6}$/; // 验证码
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var nc = document.querySelector('#nc');
    var msg = document.querySelector('#msg');
    var pwd = document.querySelector('#pwd');
    var surepwd = document.querySelector('#surepwd');
    regtest(tel, regtel); // 手机号验证
    regtest(qq, regqq) // qq验证
    regtest(nc, regnc);
    regtest(msg, regmsg);
    regtest(pwd, regpwd);
    // 表单验证函数
    function regtest(ele, reg) {
        ele.onblur = function () {
            if (reg.test(this.value)) {
                // console.log('right');
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 格式正确';
            } else {
                // console.log('error');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式错误';
            }
        }
    }
    surepwd.onblur = function () {
        if (this.value === pwd.value) {
            // console.log('right');
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 密码一致';
        } else {
            // console.log('error');
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 两次密码输入不一致';
        }
    }
}