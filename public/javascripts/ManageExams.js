

$(document).ready(function () {


    //test
    //     $.ajax({
    //         url: 'test',
    //         type: "POST",
    //
    //         data: {
    //             name: test()
    //         },
    //         dataType:'json',
    //         success: (Status) =>{
    //             // alert(Status.status);
    //         }
    //     });



    $(".divAddExamDetails").hide();
    $(".divAddExamDetails").hide();
    $("#addExam").hide();
    $("#examName").hide();
    $("#slectExam").hide();

    $("#editExam").click(()=>{
        $("#addExam").hide();
        $("#slectExam").show();
        $(".divAddExamDetails").hide();
        $("#examName").show();
        // slectExam
        $.ajax({
            url: 'getAllExams',
            type: "GET",
            data: {examName: $("#examName").val()},
            //dataType: "array",
            success: (exams) =>{
                $("#slectExam").empty();
                $("#slectExam").append("<option value=''>chose the exam</option>");
                for (let i =0; i<exams.length;i++){
                    $("#slectExam").append("<option value='"+exams[i].name +"'>"
                        +exams[i].name+
                        "</option>");
                }
            }
        });
    });


    $("#newExam").click(()=>{
        $("#examName").show();
        $("#addExam").show();
        $("#slectExam").hide();
        $(".divAddExamDetails").hide();
    });



    $("#slectExam").change(()=>{
        $("#examName:text").val($("#slectExam option:selected").val());
        $(".divAddExamDetails").show();
        showCurrExamDtails();
    });




    $("#addExam").click(()=>{
        $.ajax({
            url: 'addExam',
            type: "POST",

            data: {examName: $("#examName").val()},
            dataType:'json',
            success: (Status) =>{
                if (Status.status)
                {
                    showCurrExamDtails();
                }
            }
        });
        $(".divAddExamDetails").show();
    });


    $("#addQuestion").click(()=>{
        $.ajax({
            url: 'exam/addQuestion',
            type: "POST",

            data: {
                examName: $("#examName").val(),
                quetionName: $("#questionName").val()
            },
            dataType:'json',
            success: (Status) =>{
                if (Status.status)
                {
                    showCurrExamDtails();
                }
            }
        });
    });




    $("#addAnswer").click(()=>{
        $.ajax({
            url: 'exam/addAnswer',
            type: "POST",

            data: {
                name: $("#answerName").val(),
                questionName: $("#questionName").val(),
                correctness: $("#selectCorrectness option:selected").val()
            },
            dataType:'json',
            success: (Status) =>{
                if (Status.status)
                {
                    showCurrExamDtails();
                }
            }
        });

    });


});

function showCurrExamDtails() {

    let examName = $("#examName").val();
    if (examName.length != 0) {
        showExam(examName);
    }
}
function showExam(examName) {
    $(".divShowExam").html(`<h1>${examName}</h1><br><br>`);
    $.ajax({
        url: 'getExamDetails',
        type: "POST",
        data: {examName: examName},
        dataType: "json",
        success: (qustionsAnswers) =>{

            for (let i =0; i<qustionsAnswers.length;i++){
                if(qustionsAnswers[i].hasOwnProperty('questionName')) {

                    let html = `<p> ${i+1}- ${qustionsAnswers[i].questionName}</p>`;
                    $(".divShowExam").append(html);

                    if(qustionsAnswers[i].hasOwnProperty('answers')) {
                        html = `<ul>`;
                        qustionsAnswers[i].answers.forEach(ans => {
                            html += `<li>${ans.name}. [${ans.correctness}]</li>`;
                        });
                        html += `</ul>`;
                        $(".divShowExam").append(html);
                    }
                }
            }
        }
    });
}

function test() {
    let x ="false";
    alert(x);

    if(x === 'false'){
        alert("true: "+x);
    }
    else{
        alert("false: "+ x);
    }
}