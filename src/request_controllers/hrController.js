const app = require('../app').app;
const positionRepo = require("../database_controller/positionController");
const positionApplicationRepo = require("../database_controller/positionApplicationController");
const userExamsRepo = require("../database_controller/userExamController");
const HR = require("../entity/HR").HR;
const Position = require("../entity/Position").Position;
const PositionApplication = require("../entity/PositionApplication").PositionApplication;
const UserExams = require("../entity/UserExams").UserExams;



app.post("/getAllPositions", async (req, res) => {
    let id = JSON.parse(req.body.id);
    let temp = await positionRepo.findByHR(id);
    res.send(temp);
});

app.post("/addPosition", (req,res)=>{
    let temp = req.body;
    let position = new Position();
    //req.getSession().getParameter()
    //position.hr = ;//get hr
    let hr = new HR();
    hr.id=1;
    position.name = temp.name;
    position.description = temp.description;
    position.hr=hr;
    positionRepo.Emitter.emit("save",position);
});


app.post("/positionApplicant",async (req,res)=>{
    let positionID = req.body.positionID;
    let acceptance = JSON.parse(req.body.acceptance);
    let seen = JSON.parse(req.body.seen);
    let positionApplications = await positionApplicationRepo.findByPositionIDAndAcceptedAndSeen(positionID,acceptance,seen);
    let candidates = [];
    for(let i=0;i<positionApplications.length;i++)
    {
        let candidate = positionApplications[i].candidate;
        delete candidate.password;
        candidates.push(candidate);
    }
    res.send(candidates);
});

app.post("/updateApplication",async (req,res)=>{
    let application = new PositionApplication();
    console.log(req.body);
    application.candidate = JSON.parse(req.body.candidateID);
    application.position = JSON.parse(req.body.positionID);
    application.seen = true;
    application.accepted = JSON.parse(req.body.accepted);
    await positionApplicationRepo.update(application);
});

app.post("/addUserExams", async (req,res)=>{
    console.log(req.body);
    let exams = req.body.exams;
    let precedence = req.body.precedence;
    let candidate = JSON.parse(req.body.candidate);
    for(let i=0;i<exams.length;i++)
    {
        let userExam = new UserExams();
        userExam.candidate = candidate;
        userExam.exam = exams[i];
        userExam.passed = false;
        userExam.score = 0.0;
        if(precedence[i] != "null")
        {
            userExam.precedence = await userExamsRepo.findByCandidateAndExam(candidate,precedence[i]);
        }
        //console.log("blablabla");
        await userExamsRepo.save(userExam);
        console.log("2");
    }
});