$(document).ready(function () {
    $('#not').text(0);
    $('#examsResult').click(function () {
       if($('#not').val()==0)
       {
           alert("no results");
       }
    });
    $.ajax({
        url: "/getUserInfo",/**get info */
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: (data) => {
                $('#info').html('<p> Welcome, '+data.username+'</p>');
            }
    });
    $('#allPositions').click(function () {
        $('#view').empty();
        let table = "<table class='container'>"
            + "<thead>"
            + "<th>HR</th>"
            + "<th>Application</th>"
            + "<th>Register</th></thead>"
            + "<tbody id='body'></tbody>"
            + "</table>";
        $('#view').append(table);
        $.ajax({
            url: "/getAllPositions",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: (data) => {
                for(var i=0;i<data.length;i++) {
                    let row = "<tr>"
                        + "<td>" + data[i].HR + "</td>"
                        + "<td>" + data[i].Application + "</td>"
                        + "<td style='text-align: center;'>"
                        + "<button id='ch1'>reg</button>"
                        + "</td>"
                        + "</tr>";
                    $('#body').append(row);
                }
            }
        });
        $('#ch1').click(function () {
            alert("choice");
        });
    });
    $('#myPositions').click(function () {
        $('#view').empty();
        let table = "<table class='container'>"
            + "<thead>"
            + "<th>HR</th>"
            + "<th>Application</th>"
            + "<th>Exams</th></thead>"
            + "<tbody id='body'></tbody>"
            + "</table>";
        $('#view').append(table);
        $.ajax({
            url: "/getMyPositions",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: (data) => {
                for (var i = 0; i < data.length; i++) {
                    let row = "<tr>"
                        + "<td>" + data[i].HR + "</td>"
                        + "<td>" + data[i].Application + "</td>"
                        + "<td style='text-align: center;'>";
                    let td;
                    for (var j = 0; j < data[i].exams.length; j++) {
                        td += "<button id='ch1'><data[i].exams[j]</button>";
                    }
                    tr += td + "</td>"
                        + "</tr>";
                    $('#body').append(row);
                }
            }
        });
        $('#ch1').click(function () {
            alert("choice");
        });
    });
});