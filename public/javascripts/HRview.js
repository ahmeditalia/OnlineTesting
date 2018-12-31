$(document).ready(function () {

    let acceptance = null;
    let seen = null;
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    function applicant() {
        let html="<select id='postSelection' ></select>\n" +
            "<table id='applicantTable' style=\"width:100%\">\n" +
            "            <tr>\n" +
            "                <th>Applicant</th>\n" +
            "            </tr>\n" +
            "            <tbody id='applicantTableBody'>\n" +
            "            </tbody>\n" +
            "        </table>";
        $("#showDiv").html(html);
        $.post("/getAllPositions",{id : 1},function (data) {
            let post;
            for(let i=0; i < data.length ; i++) {
                post = data[i];
                let option = "<option value='" + post.id + "'>" + post.name + "</option>";
                $("#postSelection").append(option);
            }
        });
    }
    $(document).on("change","#postSelection",function () {
        $("#applicantTableBody").empty();
        let send = {positionID: $("#postSelection").val(),acceptance: acceptance,seen: false};
        $.post("/positionApplicant",send,function (data) {
            let applicant;
            for(let i=0; i < data.length ; i++)
            {
                applicant = data[i];
                let row="<tr><td>\n" +
                    "<a href='#' role='button' id='"+applicant.id+"'>"+applicant.username+"</a>\n" +
                    "</td></tr>";
                $("#applicantTableBody").append(row);
            }
        });
    });
    $(document).on("click","#ApplicantNotification", function(event){
        acceptance = false;
        seen = false;
        let application = {candidateID : "", positionID: "",accepted : false};
        applicant();
        $("#showDiv").delegate("a","click",function(){
            application.candidateID = this.id;
            application.positionID = $("#postSelection").val();
            // $.post("/getUserInfo",candidate,function (data) {
            //     let html = "<p>username: "+data.username+"</p>\n" +
            //         "<p>email :"+data.email+"</p>\n" +
            //         "<p>Contact Number :"+data.contactNumber+"</p>\n" +
            //         "<p>"+data.cv+"</p>";
            //     $("#showDiv").html(html);
            // }); //retreive user info
            let btn = "<button id='approve'>Approve</button>" +
                "<button id='reject'>Reject</button>";
            $("#showDiv").append(btn);

        });
        $(document).on("click","#reject",function () {
            $.post("/updateApplication",application);
        });
        $(document).on("click","#send",function () {
            application.accepted=true;
            $.post("/updateApplication",application);
            let exams = [];
            let precedence = [];
            $("select[name='exam']").each(function () {
                exams.push(this.value);
            });
            $("select[name='precedence']").each(function () {
                precedence.push(this.value);
            });
            console.log(exams);
            console.log(precedence);
            let dataContent = {candidate: application.candidateID, exams: exams, precedence: precedence};
            $.post("/addUserExams",dataContent);

        });
        $(document).on("click","#approve",function(){
            let exams =["JAVA","PYTHON","IQ"];
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
            // $.post("/getExams",function (data) {
            //     exams = data;
            // });
            updateExamList();
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
                    //let option = "<option value='" + exam.id + "'>" + exam.name + "</option>";
                    let option = "<option value='" + exam + "'>" + exam+ "</option>";
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

    });




    /////////////////////////////////////////////////////////////////////////////////////////////////


    $("#test").click(()=>{
        acceptance = true;
        seen = true;
        let applicants = applicant();
        $("a").click(()=>{
            //$.ajax(); //get user exams
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
            // for(temp in data)
            // {
            //     let row = "<tr>\n" +
            //         "<td></td>\n" +
            //         "<td></td>\n" +
            //         "<td></td>\n" +
            //         "<td></td>\n" +
            //         "</tr>";
            //     $("#examTableBody").append(row);
            // }
        });
    });

    $("#newPosition").click(()=>{
       let html = "position title <input type='text' id='positionTitle'><br>\n" +
           "        position description<br>\n" +
           "        <textarea id='positionDescription' rows='5' cols='50'></textarea>\n" +
           "        <button id='add'>add</button>";
        $("#showDiv").html(html);
        $("#add").click(()=>{
           let position = {name: $("#positionTitle").val(), description: $("#positionDescription").val()};
           $.post("/addPosition",position);
        });
    });

});