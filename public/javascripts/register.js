$(document).ready(function () {
    $("div#cancv").hide();
    $("#candidate").click(function () {
        $("div#cancv").show();
    });
    $("#HR").click(function () {
        $("div#cancv").hide();
    });
    $("#register").click(() => {
        var user = {
            username: $("#username").val(),
            password: $("#password").val(),
            email: $("#email").val(),
            contactNumber: $("#contact").val(),
            cv : $("#CV").val()
        };
        $.ajax({
            url: "request_register",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(user),
            success: (data) => {
                console.log(data);
            }
        });
    });
});