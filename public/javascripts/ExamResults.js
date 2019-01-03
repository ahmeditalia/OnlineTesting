
$(document).ready(()=> {
    $('#homePage').click(()=>{
        window.location.replace('/candidate.html');
    });

    $.ajax({
        url: "/getUserInfo",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: (data) => {
            $('#info').html('<p> Welcome, '+data.username+'</p>');
        }
    });

    $.ajax({
        url: 'examResultPage',
        type: "POST",

        dataType: 'json',
        success: (userExam) => {
            $('#examName').text(userExam.exam.name);
            $(`input[name=score]`).val(userExam.score.toFixed(2)*100+'%');
            let passed = 'No';
            if (userExam.passed)
                passed = 'Yes';
            $(`input[name=passed]`).val(passed);
            userExam.questions.forEach((questionDetails) => {

                $('#listQuestionsAnswers').append(`<li class="liQuestions">${questionDetails.question.name}</li>`);
                $('#listQuestionsAnswers').append(`<div id="${questionDetails.question.id}" class="divAnswers"></div>`);
                questionDetails.answers.forEach(answer => {
                    let color = 'black';
                    let check = false;
                    if(questionDetails.chosenAnswer != null && questionDetails.chosenAnswer.id == answer.id){
                        check= true;
                        if (!answer.correctness) {
                            color = 'red';
                        }
                    }
                    if(answer.correctness){
                        color = 'green';
                    }
                    let html = `<input type="radio" class="radAnswers" name="${questionDetails.question.id}" id="${answer.id}" value="${answer.id}" disabled>`+
                        `<label for="${answer.id}" class="radAnswers" style="color: ${color}" id="lblAns">${answer.name}</label><br>`;
                    $(`#${questionDetails.question.id}`).append(html);
                    $(`input[type=radio][id=${answer.id}]`).prop( "checked", check );

                });
            });
        }
    });
});