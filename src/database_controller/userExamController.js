const UserExams = require("../entity/UserExams").UserExams;
const metadata = require("reflect-metadata");
const getConnection = require("typeorm").getConnection();
const eventEmitter = require("events");

var Emitter = new eventEmitter();

let findByCandidate = async function (candidate)
{
    let positionRepo = await getConnection.getRepository(UserExams);
    let Exams = await positionRepo.find(
        {
            where: {candidate: candidate},
            relations : ["exam","candidate","precedence","questions"]
        });
    return Exams;
};

let findByCandidateAndExam =async function (candidate,exam)
{
    let positionRepo = await getConnection.getRepository(UserExams);
    let Exams = await positionRepo.findOne(
        {
            where: {exam: exam, candidate: candidate},
            relations : ["exam","candidate","precedence","questions"]
        });
    return Exams;
};


//Emitter.on("save",(userExam) =>{
let save = async function (userExam){
    let positionRepo = await getConnection.getRepository(UserExams);
    await positionRepo.save(userExam);
    console.log("1");
};


module.exports ={
    save,
    findByCandidateAndExam,
    findByCandidate
};