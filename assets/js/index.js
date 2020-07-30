$(function () {
    getUserInfo();
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        /*   headers: {
              Authorization: localStorage.getItem("token") || ''
          }, */
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            //渲染用户头像
            renderAvatar(res.data);
        }

    })
}

//渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $('.text-avatar').hide();

    } else {
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
        $('.layui-nav-img').hide();
    }
}
//退出功能
var layer = layui.layer;
//点击按钮,实现退出功能
$('#btnlogout').on('click', function () {
    //confirm确认框
    layer.confirm('确定退出登录?', {
        icon: 3,
        title: '提示'
    }, function (index) {
        //清空本地存储中的token
        localStorage.removeItem('token');
        //跳转到注册页面
        location.href = '/login.html';
        layer.close(index);
    });
})