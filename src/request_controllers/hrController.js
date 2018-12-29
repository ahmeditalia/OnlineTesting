const app = require('../app').app;
const HR = require("../entity/HR").HR;
const Position = require("../entity/Position").Position;
//const PositionApplication = require("../entity/PositionApplication").PositionApplication;

const positionRepo = require("../database_controller/positionController");
const positionApplicationRepo = require("../database_controller/positionApplicationController");

app.post("/getAllPositions", async (req, res) => {
    let id = JSON.parse(req.body.id);
    let temp = await positionRepo.findByHR(id);
    res.send(temp);
});

app.post("/addPosition",(req,res)=>{
    let temp = req.body;
    let position = new Position();
    //req.getSession().getParameter()
    //position.hr = ;//get hr
    let hr = new HR();
    hr.id=1;
    position.name = temp.name;
    position.description = temp.description;
    position.hr=hr;
    positionRepo.save(position)
    console.log(position);
});


app.post("/positionApplicant",async (req,res)=>{
    let positionID = req.body.positionID;
    let acceptance = JSON.parse(req.body.acceptance);
    let positionApplications = await positionApplicationRepo.findByPositionIDAndAccepted(positionID,acceptance);
    let candidates = [];
    for(let i=0;i<positionApplications.length;i++)
    {
        let candidate = positionApplications[i].candidate;
        delete candidate.password;
        candidates.push(candidate);
    }
    res.send(candidates);
});
//
// app.post("/updateApplication",(req,res)=>{
//     //let application = new PositionApplication();
//     //application.candidate = JSON.parse(req.body.candidateID);
//     //application.position = JSON.parse(req.body.positionID);
//     //application.seen = true;
//     //application.accepted = JSON.parse(req.body.accepted);
//     //positionApplicationRepo.Emitter.emit("save",application);
// });