$(document).ready(function () {
    $('#not').text(0);
    $('#examsResult').click(function () {
       if($('#not').val()==0)
       {
           alert("no results");
       }
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
            url: "/getAllSysPositions",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: (data) => {
                for(var i=0;i<data.length;i++) {
                    let row = "<tr>"
                        + "<td>" + data[i].hr.username + "</td>"
                        + "<td>" + data[i].name+", ["+data[i].description+ "]</td>"
                        + "<td style='text-align: center;'>"
                        + "<button name ='ch1' id="+data[i].id+">reg</button>"
                        + "</td>"
                        + "</tr>";
                    $('#body').append(row);
                }
                $('button[name=ch1]').click(function () {
                    alert(this.id);
                    $.post('/applyPosition',{position:this.id});
                });
            }
        });

    });
    $('#myPositions').click(function () {
        $('#view').empty();
        let table = "<table class='container'>"
            + "<thead>"
            + "<th>Position Name</th>"
            + "<th>Description</th>"
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
                        + "<td>" + data[i].position.name+ "</td>"
                        + "<td>" + data[i].position.description + "</td>"
                        + "<td style='text-align: center;'></td></tr>";
                    $('#body').append(row);
                    let a;
                    if(data[i].accepted) {
                        $.post('/getUserExamsForPos', {position: data[i].position}, (userExams) => {
                            console.log(userExams);
                            for (var j = 0; j < userExams.length; j++) {
                                a = "<a name='exam' id='" + userExams[j].id  + "' href='#'>" + userExams[j].exam.name + "</a><br>";
                                $('#body tr:last td:last').append(a);

                            }
                            $('a[name=exam]').click(function () {
                                $.post('/reqExamPageUrl',{userExamId:this.id},(data)=> {
                                    if (!data.status)
                                        window.location = data.url;
                                    else
                                        alert(data.status);
                                });
                            });
                        });
                    }
                    else if(!data[i].seen){
                        a = "on hold";
                        $('#body tr:last td:last').append(a);
                    }
                    else if(data[i].seen && !data[i].accepted){
                        a = "rejected";
                        $('#body tr:last td:last').append(a);
                    }
                }

            }
        });
    });


});