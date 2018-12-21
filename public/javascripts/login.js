$(document).ready(function () {
    console.log("test 1");
   $("#btn").click(()=>{
       console.log("test 2");
       var user={
           firstname: $('#first_name').val(),
           lastname: $("#last_name").val(),
           age: $("#age").val()
       };
       $.ajax({
           url: "register",
           type: "POST",
           dataType: 'json',
           contentType : 'application/json; charset=utf-8',
           data: JSON.stringify(user),
           success: (data) =>{
               console.log("ajax success");
           }
       });
       console.log("test 3");
   });
});