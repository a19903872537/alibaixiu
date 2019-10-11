//获取用户列表并刷新
$.ajax({
        type: 'get',
        url: '/users',
        success: function(data) {
            console.log(data);
            var html = template('userListTpl', data);
            $('#userList').html(html);
        }
    })
    //上传头像
$('#addModify').on('change', '#avatar', function() {
        let formData = new FormData();
        formData.append('avatar', this.files[0]);
        $.ajax({
            type: "post",
            url: "/upload",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                $('#avatarImg').attr('src', response[0].avatar)
                $('#hideAvatar').val(response[0].avatar);
            }
        });
    })
    //添加新用户
$("#userAdd").on('submit', function() {
    let formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(data) {
            location.reload();
        }
    })
    return false;
})