
//needs input examName and userNAme



$(document).ready(()=>{
    // let userName = 'sa2a';
    // let examName = 'Java';
    $('form').hide();
    let numOfQuestions=0;
    let examTime = 20;
    $('#seconds').text(examTime);

    $.ajax({
        url: "/getUserInfo",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: (data) => {
            $('#info').html('<p> Welcome, '+data.username+'</p>');
        }
    });

   $(`input[name=numOfAnsweredQ]`).val(0);
   $(`input[name=numOfMarkedQ]`).val(0);



   let thisUserExam ;
   $('#startExam').click(()=>{
       $('form').show();
       $('#startExam').attr("disabled", "disabled");
       $.ajax({
           url: 'examPage',
           type: "POST",

           // data: {
           //     userName: userName,
           //     examName: examName
           // },

           dataType:'json',
           success:(data)=> {
               let userExam = data.userExam;
               if (data.status) {
                   thisUserExam = userExam;
                   $('#examName').text(userExam.exam.name);
                   numOfQuestions = userExam.questions.length;
                   userExam.questions.forEach((questionDetails) => {
                       $('#listQuestionsAnswers').append(`<li class="liQuestions"><input type="checkbox" name="skipQuestion" id="${questionDetails.question.name}">`+
                           `<label for="${questionDetails.question.name}" id="lblQues">`+
                           `${questionDetails.question.name}</label></li><br>`);
                       $('#listQuestionsAnswers').append(`<div id="${questionDetails.question.id}" class="divAnswers"></div>`);
                       questionDetails.answers.forEach(answer => {
                           let html = `<input type="radio" class="radAnswers" name="${questionDetails.question.id}" id="${answer.id}" value="${answer.id}"> <label class="radAnswers" for="${answer.id}" id="lblAns">${answer.name}</label><br>`;
                           $(`#${questionDetails.question.id}`).append(html);

                       });


                       //radio answers
                       $(`input[type=radio][name=${questionDetails.question.id}]`).change(() => {
                           let ansId = $(`input[name=${questionDetails.question.id}]:checked`).val();

                           $.ajax({
                               url:'/userExam/selectAnswer',
                               type: 'POST',
                               data:{
                                   questionDetail: questionDetails,
                                   chosenAnswerID:ansId
                               },
                               success:(status)=>{
                                   console.log(status);
                               }
                           });
                       });
                   });


                   $(`input[name=numOfQuestions]`).val(numOfQuestions);
                   //check box
                   $(`input[type=checkbox]`).change(()=>{
                       $(`input[name=numOfMarkedQ]`).val($(`input[type=checkbox]:checked`).length);
                   });

                   $(`input[type=radio]`).change(()=>{
                       $(`input[name=numOfAnsweredQ]`).val($(`input[type=radio]:checked`).length);
                   });

                   // setTimeout(()=>{
                   //     alert('timeout');
                   //     $.ajax({
                   //         url:'userExam/updateResults',
                   //         type: 'POST',
                   //         success:(status)=>{
                   //             console.log(status);
                   //             window.location.replace('/ExamResults.html');
                   //
                   //         }
                   //     });
                   // },examTime);

                   setInterval(function() {
                       let count = parseInt($('#seconds').html());
                       if (count !== 0) {
                           $('#seconds').html(count - 1);
                       } else {
                           alert('timeout');
                               $.ajax({
                                   url:'userExam/updateResults',
                                   type: 'POST',
                                   success:(status)=>{
                                       console.log(status);
                                       window.location.replace('/ExamResults.html');

                                   }
                               });                       }
                   }, 1000);

               }
               else{
                   $('#examName').text(`you should pass the \'${userExam.precedence.exam.name}\' exam first`);
               }
           }
       });
   });
  /*  $.ajax({
            url: 'examPage',
            type: "POST",

            // data: {
            //     userName: userName,
            //     examName: examName
            // },

            dataType:'json',
            success:(data)=> {
                let userExam = data.userExam;
                if (data.status) {
                    thisUserExam = userExam;
                    $('#examName').text(userExam.exam.name);
                    numOfQuestions = userExam.questions.length;
                    userExam.questions.forEach((questionDetails) => {
                        $('#listQuestionsAnswers').append(`<li><input type="checkbox" name="skipQuestion" id="${questionDetails.question.name}">`+
                                                           `<label for="${questionDetails.question.name}" id="lblQues">`+
                                                             `${questionDetails.question.name}</label></li>`);
                        $('#listQuestionsAnswers').append(`<div id="${questionDetails.question.id}" class="divAnswers"></div>`);
                        questionDetails.answers.forEach(answer => {
                            let html = `<input type="radio" name="${questionDetails.question.id}" id="${answer.id}" value="${answer.id}"> <label for="${answer.id}" id="lblAns">${answer.name}</label><br>`;
                            $(`#${questionDetails.question.id}`).append(html);

                        });


                        //radio answers
                        $(`input[type=radio][name=${questionDetails.question.id}]`).change(() => {
                            let ansId = $(`input[name=${questionDetails.question.id}]:checked`).val();

                            $.ajax({
                                url:'/userExam/selectAnswer',
                                type: 'POST',
                                data:{
                                    questionDetail: questionDetails,
                                    chosenAnswerID:ansId
                                },
                                success:(status)=>{
                                  console.log(status);
                                }
                            });
                        });
                    });


                    $(`input[name=numOfQuestions]`).val(numOfQuestions);
                    //check box
                    $(`input[type=checkbox]`).change(()=>{
                        $(`input[name=numOfMarkedQ]`).val($(`input[type=checkbox]:checked`).length);
                    });

                    $(`input[type=radio]`).change(()=>{
                        $(`input[name=numOfAnsweredQ]`).val($(`input[type=radio]:checked`).length);
                    });



                    $('#submit').show();
                }
                else{
                    $('#examName').text(`you should pass the \'${userExam.precedence.exam.name}\' exam first`);
                }
            }
    });
*/



    $('#submit').click(()=>{
        $.ajax({
            url:'userExam/updateResults',
            type: 'POST',
            success:(status)=>{
                console.log(status);
            }
        });
    });
});