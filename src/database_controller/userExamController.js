const UserExams = require("../entity/UserExams").UserExams;
const metadata = require("reflect-metadata");
const getConnection = require("typeorm").getConnection();
const eventEmitter = require("events");

var Emitter = new eventEmitter();

let findById = async function (id)
{
    let userExamRepo = await getConnection.getRepository(UserExams);
    let Exams = await userExamRepo.findOne(id,{
            relations : ["exam","candidate","precedence","questions","position"]
        });
    return Exams;
};


let findByCandidateAndPosition = async function (candidate,position)
{
    let userExamRepo = await getConnection.getRepository(UserExams);
    let Exams = await userExamRepo.find(
        {
            where: {candidate: candidate,position: position},
            relations : ["exam","candidate","precedence","questions","position"]
        });
    return Exams;
};


let findByCandidateAndExamAndPosition =async function (candidate,exam,position)
{
    let userExamRepo = await getConnection.getRepository(UserExams);
    let Exams = await userExamRepo.findOne(
        {
            where: {exam: exam, candidate: candidate,position: position},
            relations : ["exam","candidate","precedence","questions"]
        });
    return Exams;
};


//Emitter.on("save",(userExam) =>{
let save = async function (userExam){
    let userExamRepo = await getConnection.getRepository(UserExams);
    await userExamRepo.save(userExam);
};


module.exports ={
    save,
    findByCandidateAndExamAndPosition,
    findByCandidateAndPosition,
    findById
};