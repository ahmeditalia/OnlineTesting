$(document).ready(function () {
    $("#divCV").hide();
    let flag =true;
    $("input[type=checkbox][id=myonoffswitch2]").change(()=>{
        flag = !flag;
        $("#divCV").toggle();
        // if(flag)
        //     alert("HR");
        // else
        //     alert("Candidate");
    });
    $("#register").click(() => {
        if(!validationٌRegister(flag))
            return;
        let user = {
            username: $("#user2").val(),
            password: $("#pass2").val(),
            email: $("#email").val(),
            contactNumber: $("#contact").val(),
            cv : $("#cv").val(),
            type: flag
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