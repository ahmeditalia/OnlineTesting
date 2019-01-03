const examController = require('../database_controller/userExamController');
examEvents = examController.event;
let app = require('../app').app;


app.post('/reqExamPageUrl', async (req, res) => {
    req.session.userExamID = req.body.userExamId;
    let userExam = await examController.getUserEx(req);
    let status;
    if (userExam.precedence == null || userExam.precedence.passed) {
        status = null;
        if(userExam.questions[0].question != null){
            status = 'you finished this exam and can not start it again!!';
        }
    } else {
        status = `you should pass the '${userExam.precedence.exam.name}' exam first !!`;
    }
    res.send({status: status, url: '/UserExam.html'});
});


app.post('/examPage',(req,res)=>{
    examEvents.emit('getUserGeneratedExam',req, res);
});
app.post('/userExam/selectAnswer', async (req, res) => {
    await examController.updateSolvingUserExam(req);
    res.send("Answer saved");
});

app.post('/userExam/updateResults', async (req, res) => {
    await examController.updateUserExamResults(req);
    res.send('results updated');
});

app.post('/examResultPage', async (req, res) => {
    let userExam = await examController.getUserEx(req);
    res.send(userExam);
});

app.post('/examResultPageWithID', async (req, res) => {
    req.session.userExamID = req.body.userExamID;
    res.send({url:'/ExamResults.html'});
});