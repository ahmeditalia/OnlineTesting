const examController = require('../database_controller/ExamController');
examEvents = examController.event;
let app = require('../app').app;

app.post('/addExam',(req,res)=>{
    examEvents.emit('addExam',res, req.body.examName);
});

app.post('/exam/addQuestion',(req,res)=>{
    console.log(req.body);
    examEvents.emit('addQuestion',res, req.body.examName, req.body.quetionName);
});
app.post('/exam/addAnswer',  (req, res) => {
    console.log('new ans sreceived');
    examEvents.emit('addAnswer',res, req.body);
});

app.get('/getAllExams', async (req, res) => {
    examEvents.emit('getAllExams',res);
});

app.post('/getExamDetails', async (req, res) => {
    examEvents.emit('getExamDetails',res,req.body.examName);
});



////////////////////////////////////////////////////
app.post('/examPage',(req,res)=>{
    console.log(req.body);
    examEvents.emit('generateUserExam',res, req.body.examName, req.body.userName);
});


app.post('/getUserExam', async (req, res) => {
    let data = await examController.getUserExam(req.body.examName, req.body.userName);
    console.log(data);
    res.send(data);
});

app.post('/test', async (req, res) => {
    let data = await examController.getUserExam(req.body.examName, req.body.userName);
    console.log(data);
    data.questions.forEach(q=>{
        console.log(q.name);

    });
    res.send(data);
});
