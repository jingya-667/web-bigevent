$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    //为有权限的接口制定complete回调函数,保障如果未登录则无法进入页面
    options.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败!") {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})