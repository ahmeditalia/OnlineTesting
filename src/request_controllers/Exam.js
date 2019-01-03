const examController = require('../database_controller/ExamController');
examEvents = examController.event;
let app = require('../app').app;

app.post('/addExam',(req,res)=>{
    examEvents.emit('addExam',res, req.body.examName);
});

app.post('/exam/addQuestion',(req,res)=>{
    examEvents.emit('addQuestion',res, req.body.examName, req.body.quetionName);
});
app.post('/exam/addAnswer',  (req, res) => {
    examEvents.emit('addAnswer',res, req.body);
});

app.get('/getAllExams', async (req, res) => {
    let exams = await examController.getAllExams();
    res.send(exams);
});

app.post('/getExamDetails', async (req, res) => {
    let details =examController.getExamDetails(req.body.examName);
    res.send(details);
});



////////////////////////////////////////////////////

//
// app.post('/getUserExam', async (req, res) => {
//     let userExam = await examController.getUserExam(req.body.examName, req.body.userName);
//     let status = false;
//     console.log(userExam);
//
//     if(userExam.precedence == null || userExam.precedence.passed) {
//         status = true;
//     }
//     res.send({status: status, userExam: userExam});
//
// });

// app.post('/test', async (req, res) => {
//     let data = await examController.getUserExam(req.body.examName, req.body.userName);
//     console.log(data);
//     data.questions.forEach(q=>{
//         console.log(q.name);
//
//     });
//     res.send(data);
// });
