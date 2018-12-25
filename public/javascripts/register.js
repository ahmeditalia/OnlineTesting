$(document).ready(function () {
    $("#register").click(()=>{
        var user={
            firstname: $('#firstname').val(),
            lastname: $("#lastname").val(),
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val()
        };
        $.ajax({
            url: "register",
            type: "POST",
            dataType: 'json',
            contentType : 'application/json; charset=utf-8',
            data: JSON.stringify(user),
            success: (data) =>{
                console.log(data);
            }
        });
    });
});