const examController = require('../database_controller/userExamController');
examEvents = examController.event;
let app = require('../app').app;


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
    let userExam = await examController.getUserExam(req);
    res.send(userExam);
});