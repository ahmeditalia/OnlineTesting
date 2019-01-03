const app = require('../app').app;
const positionRepo = require("../database_controller/positionController");
const positionApplicationRepo = require("../database_controller/positionApplicationController");
const userExamsRepo = require("../database_controller/userExamController");
const ExamRepo = require("../database_controller/ExamController");

const HR = require("../entity/HR").HR;
const Position = require("../entity/Position").Position;
const PositionApplication = require("../entity/PositionApplication").PositionApplication;
const UserExams = require("../entity/UserExams").UserExams;
const examController= require('../database_controller/ExamController');


app.post("/getAllPositions", async (req, res) => {
    let id = req.session.user.id;
    let temp = await positionRepo.findByHR(id);
    res.send(temp);
});

app.post("/addPosition", async (req, res) => {
    let temp = req.body;
    let position = new Position();
    position.name = temp.name;
    position.description = temp.description;
    position.hr =req.session.user;
    await positionRepo.save(position);
});


app.post("/allPositionApplicant",async (req,res)=>{
    let acceptance = JSON.parse(req.body.acceptance);
    let seen = JSON.parse(req.body.seen);
    let Positions = await positionRepo.findByHR(req.session.user.id);
    let positionApplications = [];
    for(let i=0;i<Positions.length;i++)
    {
        let temp = await positionApplicationRepo.findByPositionIDAndAcceptedAndSeen(Positions[i].id,acceptance,seen);
        positionApplications = positionApplications.concat(temp);
    }
    for(let i=0;i<positionApplications.length;i++)
    {
        delete positionApplications[i].candidate.password;
    }
    res.send(positionApplications);
});


app.post("/positionApplicant",async (req,res)=>{
    let positionID = req.body.positionID;
    let acceptance = JSON.parse(req.body.acceptance);
    let seen = JSON.parse(req.body.seen);
    let positionApplications = await positionApplicationRepo.findByPositionIDAndAcceptedAndSeen(positionID,acceptance,seen);
    for(let i=0;i<positionApplications.length;i++)
    {
        delete positionApplications[i].candidate.password;
    }
    res.send(positionApplications);
});

app.post("/updateApplication",async (req,res)=>{
    let application = new PositionApplication();
    console.log(req.body);
    application.candidate = JSON.parse(req.body.candidateID);
    application.position = JSON.parse(req.body.positionID);
    application.seen = true;
    application.accepted = JSON.parse(req.body.accepted);
    await positionApplicationRepo.update(application);
    res.send();
});

app.post("/addUserExams", async (req,res)=>{
    console.log(req.body);
    let exams = req.body.exams;
    let precedence = req.body.precedence;
    let candidate = JSON.parse(req.body.candidate);
    let position = req.body.position;
    for(let i=0;i<exams.length;i++)
    {
        let userExam = new UserExams();
        userExam.candidate = candidate;
        userExam.exam = await ExamRepo.getExamByName(exams[i]);
        userExam.passed = false;
        userExam.score = 0.0;
        userExam.position = position;
        if(precedence[i] != "null")
        {
            let temp = await ExamRepo.getExamByName(precedence[i]);
            userExam.precedence = await userExamsRepo.findByCandidateAndExamAndPosition(candidate,temp.id,position);
        }
        await userExamsRepo.save(userExam);
    }
    res.send();
});


app.post("/getUserExams", async (req,res)=>{
    let candidate = req.body.candidate;
    let position = req.body.position;
    let userExams = await userExamsRepo.findByCandidateAndPosition(candidate,position);
    for(let i=0;i<userExams.length;i++)
    {
        if(userExams[i].precedence)
            userExams[i].precedence = await userExamsRepo.findById(userExams[i].precedence.id);
    }
    res.send(userExams);
});

app.post("/getUserExamsForPos", async (req,res)=>{
    let candidate = req.session.user;
    let position = req.body.position;
    let userExams = await userExamsRepo.findByCandidateAndPosition(candidate,position);
    for(let i=0;i<userExams.length;i++)
    {
        if(userExams[i].precedence)
            userExams[i].precedence = await userExamsRepo.findById(userExams[i].precedence.id);
    }
    res.send(userExams);
});

app.post('/getAllSysPositions', async (req, res) => {
    res.send(await positionRepo.getAllPositions());
});

app.post('/getMyPositions', async (req, res) => {
    res.send(await positionApplicationRepo.getApliedPositions(req.session.user));
});

app.post('/getExams', async (req, res) => {
    res.send(await examController.getAllExams());
});

app.post("/applyPosition",async (req,res)=>{
    let application = new PositionApplication();
    application.candidate = req.session.user;
    application.position = req.body.position;
    application.accepted = false;
    application.seen = false;
    await positionApplicationRepo.save(application);
});
