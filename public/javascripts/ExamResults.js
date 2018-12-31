
$(document).ready(()=> {
    let userName = 'sa2a';
    let examName = 'Java';

    $(`input[name=numOfAnsweredQ]`).val(0);
    $(`input[name=numOfMarkedQ]`).val(0);

    $.ajax({
        url: 'examResultPage',
        type: "POST",

        data: {
            userName: userName,
            examName: examName
        },

        dataType: 'json',
        success: (userExam) => {
            $('#examName').text(userExam.exam.name);
            userExam.questions.forEach((questionDetails) => {

                $('#listQuestionsAnswers').append(`<li>${questionDetails.question.name}</li>`);
                $('#listQuestionsAnswers').append(`<div id="${questionDetails.question.id}" class="divAnswers"></div>`);
                questionDetails.answers.forEach(answer => {
                    // let colore = 'red';
                    // if(answer.correctness){
                    //     colore = 'gree'
                    // }
                    let html = `<input type="radio" style="color: green" name="${questionDetails.question.id}" id="${answer.id}" value="${answer.id}"> <label for="${answer.id}" id="lblAns">${answer.name}</label><br>`;
                    $(`#${questionDetails.question.id}`).append(html);

                });
            });
        }
    });
});