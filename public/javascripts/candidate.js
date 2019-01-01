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
            data: '',
            success: (data) => {
                $('#info').html('<p> Welcome, '+data.username+'</p>');
            }
    });
    $('#allPositions').click(function () {
        $('#allApplications').empty();
        let table = "<table class='container'>"
            + "<thead>"
            + "<th>HR</th>"
            + "<th>Application</th>"
            + "<th>Register</th></thead>"
            + "<tbody id='body'></tbody>"
            + "</table>";
        $('#allApplications').append(table);
        // row = "<tr>"
        //         + "<td>" + da.HR + "</td>"
        //         + "<td>" + da.Application + "</td>"
        //         + "<td style='text-align: center;'>"
        //         + "<button id='ch1'>reg</button>"
        //         + "</td>"
        //         + "</tr>";
        //         $('#body').append(row);
        $.ajax({
            url: "/",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: /*data*/'',
            success: (data) => {
                row = "<tr>"
                + "<td>" + data.HR + "</td>"
                + "<td>" + data.Application + "</td>"
                + "<td style='text-align: center;'>"
                + "<button id='ch1'>reg</button>"
                + "</td>"
                + "</tr>";
                $('#body').append(row);
            }
        });
        $('#ch1').click(function () {
            alert("choice");
        });
    });
});