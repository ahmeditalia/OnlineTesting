
//needs input examName and userNAme



$(document).ready(()=>{
    let userName = 'sa2a';
    let examName = 'Java';
    let numOfQuestions=0;
   $(`input[name=numOfAnsweredQ]`).val(0);
   $(`input[name=numOfMarkedQ]`).val(0);



    $('#submit').hide();

   let thisUserExam ;
    $.ajax({
            url: 'examPage',
            type: "POST",

            data: {
                userName: userName,
                examName: examName
            },

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
                            let answer = questionDetails.answers.find((element) => {
                                return element.id == ansId;
                            });
                            questionDetails.chosenAnswer = answer;

                            $.ajax({
                                url:'/userExam/selectAnswer',
                                type: 'POST',
                                data:{
                                    questionDetail: questionDetails,
                                },
                                success:(status)=>{
                                  alert('ans saved');
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



    /*$('#submit').click(()=>{
        thisUserExam.score = score;
        if(score >= .5 ){
            thisUserExam.passed = true;
        }
        console.log(thisUserExam);
        alert(score);
    });*/
});