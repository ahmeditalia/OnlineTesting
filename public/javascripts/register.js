$(document).ready(function () {
    $("#divCv").hide();
    let flag =true;
    $("#myonoffswitch2").click(()=>{
        flag = !flag;
        // if(flag)
        //     alert("HR");
        // else
        //     alert("Candidate");
    });
    $("#register").click(() => {
        if(!validationٌRegister())
            return;
        let user = {
            username: $("#user2").val(),
            password: $("#pass2").val(),
            email: $("#email").val(),
            contactNumber: $("#contact").val(),
            cv : $("#cv").val()
        };
        $.ajax({
            url: "request_register",
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