
//needs input examName and userNAme



$(document).ready(()=>{
    let userName = 'sa2a';
    let examName = 'Java';

    //test
    //     $.ajax({
    //         url: 'test',
    //         type: "POST",
    //
    //         data: {
    //             userName: userName,
    //             examName: examName
    //         },
    //         dataType:'json',
    //         success:(userExam)=> {
    //             $('#examName').text(userExam.exam.name);
    //             userExam.questions.forEach((questionDetails) => {
    //                 $('form').append(`<p>${questionDetails.question.name}</p>`);
    //                 questionDetails.answers.forEach(answer => {
    //                     let html = `<input type="radio" id="${answer.id}" value="${answer.id}"> <label for="${answer.id}" id="lblAns">${answer.name}</label>`;
    //                     $('form').append(html);
    //                 });
    //             });
    //         }
    //     });



   /* $.ajax({
        url: 'examPage',
        type: "POST",

        data: {
            userName: userName,
            examName: examName
        },

        dataType:'json',
        success:(userExam)=> {
            alert(userExam);
            $('#examName').text(userExam.exam.name);
            userExam.questions.forEach((questionDetails) => {
                $('#divQuestionsAnswers').append(`<p>${questionDetails.question.name}</p>`);
                questionDetails.answers.forEach(answer => {
                    let html = `<input type="radio" id="${answer.id}" value="${answer.id}"> <label for="${answer.id}" id="lblAns">${answer.name}</label><br>`;
                    $('#divQuestionsAnswers').append(html);
                });
            });
        }
    });*/

    $.ajax({
            url: 'getUserExam',
            type: "POST",

            data: {
                userName: userName,
                examName: examName
            },

            dataType:'json',
            success:(userExam)=> {
                $('#examName').text(userExam.exam.name);
                userExam.questions.forEach((questionDetails) => {
                    $('#listQuestionsAnswers').append(`<li>${questionDetails.question.name}</li>`);
                    $('#listQuestionsAnswers').append(`<div id="${questionDetails.question.id}" class="divAnswers"></div>`);

                    questionDetails.answers.forEach(answer => {
                        let html = `<input type="radio" id="${answer.id}" value="${answer.id}"> <label for="${answer.id}" id="lblAns">${answer.name}</label><br>`;
                        $(`#${questionDetails.question.id}`).append(html);
                    });
                });
            }
    });

    $('radio').click(()=>{
        if($(this).selected()){
            $(this).select = false;
        }
        else{
            $(this).select = true;

        }
    });
});