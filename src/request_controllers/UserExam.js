const examController = require('../database_controller/ExamController');
examEvents = examController.event;
let app = require('../app').app;


app.post('/examPage',(req,res)=>{
    examEvents.emit('getUserExam',req, res);
});

app.post('/userExam/selectAnswer', async (req, res) => {
    await examController.updateSolvingUserExam(req.body.questionDetail, req.body.chosenAnswerID);
    res.send("Answer saved");
});

app.post('/userExam/updateResults', async (req, res) => {
    await examController.updateUserExamResults(req.body.examName, req.body.userName);
});

app.post('/examResultPage', async (req, res) => {
    let userExam = await examController.getUserExam(req.body.examName, req.body.userName);
    res.send(userExam);
});