$(document).ready(function () {
    let flag =true;
    $("#myonoffswitch").click(()=>{
        flag = !flag;
        // if(flag)
        //     alert("HR");
        // else
        //     alert("Candidate");
    });
    $("#login").click(() => {
        if(!validationLogin())
            return;
        let user = {
            username: $("#user").val(),
            password: $("#pass").val(),
            hr:flag
        };
        $.ajax({
            url: "login",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(user),
            success: (data) => {
                alert(data.success);
            }
        });
    });
});