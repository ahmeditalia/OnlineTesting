$(document).ready(function () {

    let acceptance = false;
    let seen = false;
    let application;

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    function initApplicationList() {
        $.post("/getAllPositions",{id : 1},function (data) {
            let post;
            for(let i=0; i < data.length ; i++) {
                post = data[i];
                let option = "<option value='" + post.id + "'>" + post.name + "</option>";
                $("#postSelection").append(option);
            }
        });
    }
    function initApplicationTable() {
        $("#applicantTableBody").empty();
        let name;
        if(seen === false)
        {
            name = 'application'
        }
        else
            name = 'test';
        if($("#postSelection").val() === '0')
        {
            $.post("/allPositionApplicant",{acceptance: acceptance,seen: seen},function (data){
                for(let i=0; i < data.length ; i++)
                {
                    let row="<tr>" +
                        "<td>\n" +
                        "<a href='#' role='button' id='"+data[i].candidate.id+"' name='"+name+"'>"+data[i].candidate.username+"</a>\n" +
                        "</td>" +
                        "<td>\n" +
                        "<p id='"+data[i].position.id+"'>"+data[i].position.name+"</p>" +
                        "</td>" +
                        "</tr>";
                    $("#applicantTableBody").append(row);
                }
            });
        }
        else{
            $("#applicantTableBody").empty();
            let send = {positionID: $("#postSelection").val(),acceptance: acceptance,seen: seen};
            $.post("/positionApplicant",send,function (data) {
                for(let i=0; i < data.length ; i++)
                {
                    let row="<tr><td>\n" +
                        "<a href='#' role='button' id='"+data[i].candidate.id+"'>"+data[i].candidate.username+"</a>\n" +
                        "</td>" +
                        "<td>\n" +
                        "<p id='"+data[i].position.id+"'>"+data[i].position.name+"</p>" +
                        "</td>" +
                        "</tr>";
                    $("#applicantTableBody").append(row);
                }
            });
        }
    }
    initApplicationList();
    initApplicationTable();
    $("#ApplicantNotification").hide();


    $(document).on("change","#postSelection",function () {
        initApplicationTable();
    });
    $(document).on("click","#ApplicantNotification", function(event){

        $("#showDiv").hide();
        $("#test").show();
        $("#ApplicantNotification").hide();
        $("#newPosition").show();
        $("#applicationDiv").show();
        acceptance = false;
        seen = false;
        initApplicationTable();
    });
    $("#applicantTableBody").delegate("a[name='application']","click",function(){
        $("#showDiv").show();
        $("#applicationDiv").hide();
        application = {candidateID : "", positionID: "",accepted : false};
        application.candidateID = this.id;
        application.positionID = $(this).parents("tr").find("p").attr("id");
        // $.post("/getUserInfo",candidate,function (data) {
        //     let html = "<p>username: "+data.username+"</p>\n" +
        //         "<p>email :"+data.email+"</p>\n" +
        //         "<p>Contact Number :"+data.contactNumber+"</p>\n" +
        //         "<p>"+data.cv+"</p>";
        //     $("#showDiv").html(html);
        // }); //retreive user info
        let btn = "<button id='approve'>Approve</button>" +
            "<button id='reject'>Reject</button>";
        $("#showDiv").html(btn);
    });
    $("#showDiv").on("click","#reject", function () {
        application.accepted= false;
        $.post("/updateApplication",application,function () {
            $("#showDiv").hide();
            initApplicationTable();
            $("#applicationDiv").show();
        });
    });
    $("#showDiv").on("click","#send",function () {
        application.accepted=true;
        let exams = [];
        let precedence = [];
        $("select[name='exam']").each(function () {
            exams.push(this.value);
        });
        $("select[name='precedence']").each(function () {
            precedence.push(this.value);
        });
        $.post("/updateApplication",application,function () {
            let dataContent = {candidate: application.candidateID, exams: exams, precedence: precedence , position: application.positionID};
            $.post("/addUserExams",dataContent,function () {
                $("#showDiv").hide();
                initApplicationTable();
                $("#applicationDiv").show();
            });
        });
    });
    $("#showDiv").on("click","#approve",function(){
        $("#showDiv").show();
        $("#applicationDiv").hide();
        let exams =[];
        let html = "<table id='examTable' border='1' style=\"width:100%\">\n" +
            "            <tr>\n" +
            "                <th>Exam</th>\n" +
            "                <th>Precedence</th>\n" +
            "            </tr>\n" +
            "            <tbody id='examTableBody'>\n" +
            "                <tr>\n" +
            "                    <td>\n" +
            "                        <select name='exam'>\n" +
            "                        </select>\n" +
            "                    </td>\n" +
            "                    <td>\n" +
            "                        <select name='precedence'>\n" +
            "                           <option value='" + null + "'>" + null + "</option>\n"+
            "                        </select>\n" +
            "                    </td>\n" +
            "                </tr>\n" +
            "            </tbody>\n" +
            "            <tfoot id='examTableFoot'>\n" +
            "                <tr>\n" +
            "                   <td id='buttonRow' colspan='2'>\n" +
            "                       <button id='addExam'>add Exam</button>\n"+
            "                   </td>\n" +
            "                </tr>\n"+
            "            </tfoot>\n"+
            "        </table>";
        $("#showDiv").html(html);
        $("#showDiv").append("<button id='send'>Send</button>");
        $.post("/getExams",function (data) {
            exams = data;
            updateExamList();
        });

        $("#addExam").click(()=>{
            let row = "<tr>\n" +
                "                    <td>\n" +
                "                        <select name='exam'>\n" +
                "                        </select>\n" +
                "                    </td>\n" +
                "                    <td>\n" +
                "                        <select name='precedence'>\n" +
                "                        </select>\n" +
                "                    </td>\n" +
                "                </tr>";
            $(row).appendTo("#examTableBody");
            updateExamList();
            updatePrecedenceList();
            $("select[name='exam']").change(function () {
                updatePrecedenceList();
            });
        });
        function updateExamList() {
            let exam;
            for(let i=0; i < exams.length ; i++) {
                exam = exams[i];
                let option = "<option value='" + exam.name + "'>" + exam.name + "</option>";
                // let option = "<option value='" + exam + "'>" + exam+ "</option>";
                $('#examTableBody tr:last').find("select[name='exam']").append(option);
            }
        }
        function updatePrecedenceList() {
            let precedence = [null];
            $("select[name='precedence']").empty();
            $("select[name='exam']").each(function () {
                precedence.push(this.value);
            });
            precedence = precedence.filter(onlyUnique);
            for(let i in precedence)
            {
                $("#examTableBody tr").each(function () {
                    console.log($(this).find("select[name='exam']").val());
                    if($(this).find("select[name='exam']").val() !== precedence[i])
                    {
                        let option = "<option value='" + precedence[i] + "'>" + precedence[i] + "</option>\n";
                        $(this).find("select[name='precedence']").append(option);
                    }
                });
            }
        }
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////


    $(document).on("click","#test", function(event){

        $("#showDiv").hide();
        $("#test").hide();
        $("#ApplicantNotification").show();
        $("#newPosition").show();
        $("#applicationDiv").show();

        acceptance = true;
        seen = true;
        initApplicationTable();
    });

    $("#applicantTableBody").delegate("a[name='test']","click",function(){
        $("#showDiv").show();
        $("#applicationDiv").hide();
        let html = "<table id='examTable' style=\"width:100%\">\n" +
            "            <tr>\n" +
            "                <th>Exam</th>\n" +
            "                <th>Precedence</th>\n" +
            "                <th>Pass</th>\n" +
            "                <th>Score</th>\n" +
            "            </tr>\n" +
            "            <tbody id='examTableBody'>\n" +
            "            </tbody>\n" +
            "        </table>";
        $("#showDiv").html(html);
        let application = {candidate : this.id, position: $(this).parents("tr").find("p").attr("id")};
        $.post("/getUserExams",application,function (data) {
            for(let i=0;i<data.length;i++)
            {
                let precedence;
                if(data[i].precedence)
                {
                    precedence = data[i].precedence.exam.name;
                }else
                    precedence = "No Precedence";
                alert(data[i].id);
                let row = "<tr>\n" +
                    "<td><a href='#' role='button' id='"+data[i].id+"' name='exam'>"+data[i].exam.name+"</a></td>" +
                    "<td>"+precedence+"</td>" +
                    "<td>"+data[i].passed+"</td>" +
                    "<td>"+data[i].score+"</td>" +
                    "</tr>";
                $("#examTableBody").append(row);
            }
        });
    });
    $("#examTable").delegate("a[name='exam']","click",function(){

    });

//////////////////////////////////////////////////////////////////////////////////////////////////////

    $("#newPosition").click(()=>{
        $("#showDiv").show();
        $("#test").show();
        $("#ApplicantNotification").show();
        $("#newPosition").hide();
        $("#applicationDiv").hide();


        let html = "position title <input type='text' id='positionTitle'><br>\n" +
           "        position description<br>\n" +
           "        <textarea id='positionDescription' rows='5' cols='50'></textarea>\n" +
           "        <button id='add'>add</button>";
        $("#showDiv").html(html);
        $("#add").click(()=>{
           let position = {name: $("#positionTitle").val(), description: $("#positionDescription").val()};
           $.post("/addPosition",position,()=>{
               initApplicationList();
           });
        });
    });

});