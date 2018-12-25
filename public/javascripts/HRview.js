$(document).ready(function () {
    function applicant() {
        var html="<select id='postSelection'></select>\n" +
            "<table id='applicantTable' style=\"width:100%\">\n" +
            "            <tr>\n" +
            "                <th>Applicant</th>\n" +
            "            </tr>\n" +
            "            <tbody id='applicantTableBody'>\n" +
            "            </tbody>\n" +
            "        </table>";
        $("#showDiv").html(html);
        //$.ajax();//retrieve all posts
        //$.ajax();//retreive all user for this post
        var data=["a"];
        var applicant;
        var post;
        for(post in data) {
            var option = "<option value='" + post + "'>" + post + "</option>";
            $("#postSelection").append(option);
        }
        for(applicant in data)
        {
            var row="<tr><td>\n" +
                "<a role='button'>"+applicant+"</a>\n" +
                "</td></tr>";
            $("#applicantTableBody").append(row);
        }
    }
    $("#ApplicantNotification").click(()=>{
        applicant();
        $("a").click(()=>{
            //$.ajax(); retreive user info
            var btn = "<button id='approve'>Approve</button>" +
                "<button id='reject'>Reject</button>";
            $("#showDiv").html(btn);
            console.log("link clicked");
            $("#approve").click(()=>{
                var html = "<table id='examTable' style=\"width:100%\">\n" +
                    "            <tr>\n" +
                    "                <th>Exam</th>\n" +
                    "                <th>Precedence</th>\n" +
                    "            </tr>\n" +
                    "            <tbody id='examTableBody'>\n" +
                    "                <tr>\n" +
                    "                    <td>\n" +
                    "                        <select>\n" +
                    "                            <option value=\"java\">java</option>\n" +
                    "                            <option value=\"python\">python</option>\n" +
                    "                            <option value=\"oop\">oop</option>\n" +
                    "                            <option value=\"C++\">C++</option>\n" +
                    "                        </select>\n" +
                    "                    </td>\n" +
                    "                    <td>\n" +
                    "                        <select>\n" +
                    "                            <option value=\"java\">java</option>\n" +
                    "                            <option value=\"python\">python</option>\n" +
                    "                            <option value=\"oop\">oop</option>\n" +
                    "                            <option value=\"C++\">C++</option>\n" +
                    "                        </select>\n" +
                    "                    </td>\n" +
                    "                </tr>\n" +
                    "            </tbody>\n" +
                    "        </table>";
                $("#showDiv").html(html);
                $("#showDiv").append("<button id='addExam'>add Exam</button><br>");
                $("#showDiv").append("<button id='send'>Send</button>");
                $("#addExam").click(()=>{
                    var row = "<tr>\n" +
                        "                    <td>\n" +
                        "                        <select>\n" +
                        "                            <option value=\"java\">java</option>\n" +
                        "                            <option value=\"python\">python</option>\n" +
                        "                            <option value=\"oop\">oop</option>\n" +
                        "                            <option value=\"C++\">C++</option>\n" +
                        "                        </select>\n" +
                        "                    </td>\n" +
                        "                    <td>\n" +
                        "                        <select>\n" +
                        "                            <option value=\"java\">java</option>\n" +
                        "                            <option value=\"python\">python</option>\n" +
                        "                            <option value=\"oop\">oop</option>\n" +
                        "                            <option value=\"C++\">C++</option>\n" +
                        "                        </select>\n" +
                        "                    </td>\n" +
                        "                </tr>";
                    $("#examTableBody").append(row);
                });
                $("#send").click(()=>{

                });
            });
            $("#reject").click(()=>{

            });
        });

    });

    $("#test").click(()=>{
        applicant();
        $("a").click(()=>{
            //$.ajax(); //get user exams
            var html = "<table id='examTable' style=\"width:100%\">\n" +
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
            //     var row = "<tr>\n" +
            //         "<td></td>\n" +
            //         "<td></td>\n" +
            //         "<td></td>\n" +
            //         "<td></td>\n" +
            //         "</tr>";
            //     $("#examTableBody").append(row);
            // }
        });
    });



});