const examController = require('../database_controller/ExamController');
examEvents = examController.event;
let app = require('../app').app;


app.post('/examPage',(req,res)=>{
    examEvents.emit('getUserExam',req, res);
});

app.post('/userExam/selectAnswer', async (req, res) => {
    await examController.updateSolvingUserExam(req.body.questionDetail);
    res.send("saveds")
});
app.post('/examResultPage', async (req, res) => {
    res.send(await examController.getUserExam(req.body.examName, req.body.userName));
});