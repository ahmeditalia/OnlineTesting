const shuffle = require('shuffle-array');
const UserExams = require('../entity/UserExams').UserExams;
const Candidate = require('../entity/Candidate').Candidate;
const QuestionDetail = require('../entity/QuestionDetail').QuestionDetail;
const Answer =require('../entity/Answer').Answer;
const Question = require('../entity/Question').Question;
const Exam = require('../entity/Exam').Exam;
const metadata = require("reflect-metadata");
const getConnection = require("typeorm").getConnection();
const connection = getConnection;
const eventEmitter = require("events");

let event = new eventEmitter();

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






//////////////////////////////////////////////////////////////////////////////////////////
event.on('getUserGeneratedExam', async (req, res) => {


    //user exam should come from sessions
    // let exam = req.session.exam;
    // let candidate = req.session.candidate;
    // let exam = await connection.getRepository(Exam).findOne({name: req.body.examName}, {relations: ["questions"]});
    // let candidate = await connection.getRepository(Candidate).findOne({username: req.body.userName});

    let userExam = await getUserEx(req);
    let exam = userExam.exam;
    let status = false;
    let numOfQuestions =4;
    if (userExam.precedence == null || userExam.precedence.passed) {
        if (userExam.questions.length != numOfQuestions) {
            let generatedQuestions = getRandomElements(exam.questions, numOfQuestions);
            for (let i = 0; i < numOfQuestions; i++) {
                let questionDetails = new QuestionDetail();
                questionDetails.question = generatedQuestions[i];
                let wrongAns = await connection.manager.find(Answer, {
                    question: questionDetails.question,
                    correctness: false
                });
                questionDetails.answers = getRandomElements(wrongAns, 3);
                let correctAnswers = await connection.manager.find(Answer, {
                    question: questionDetails.question,
                    correctness: true
                });
                questionDetails.answers.push(getRandomElements(correctAnswers, 1)[0]);
                shuffle(questionDetails.answers);
                questionDetails.userExam = userExam;
                await connection.manager.save(questionDetails);
                // userExam.questions.push(questionDetails);
            }
            userExam = await getUserEx(req);
        }
        // await userExam.reload();
        status = true;
    }
    // req.session.setTimeout(10,(gfhgj)=>{
    //    console.log('timeOut')
    // });
    res.send({status: status, userExam: userExam});

});



// let getUserExam = ( examName, userName)=>{
//     return typeorm.createConnection().then(async connection => {
//         let exam = await connection.getRepository(Exam).findOne({name: examName},{ relations: ["questions"] });
//         let candidate = await connection.getRepository(Candidate).findOne({username: userName});
//         let userExam = await connection.manager.findOne(UserExams, {exam: exam, candidate: candidate},
//             {relations:["exam","candidate","questions","questions.question","questions.chosenAnswer","questions.answers"]});
//         await connection.close();
//         return userExam;
//     }).catch(error => console.log(error));
// };


function getRandomElements(arr, numOfElements) {
    let returnArray = new Array(numOfElements);
    let chosenIndex;
    let chosenElements = new Array(numOfElements);
    for (let i=0; i< numOfElements; i++) {
        do {
            chosenIndex = randomInt(0, arr.length);
        } while (chosenElements.includes(chosenIndex));
        chosenElements[i] = chosenIndex;
        returnArray[i] = arr[chosenIndex];
    }
    return returnArray;
}

function randomInt(low, high) {// low (inclusive) and high (exclusive) ([low, high
    return Math.floor(Math.random() * (high - low) + low)
}


let getUserExam = async (examName, userName) => {
    let exam = await connection.getRepository(Exam).findOne({name: examName}, {relations: ["questions"]});
    let candidate = await connection.getRepository(Candidate).findOne({username: userName});
    return await connection.manager.findOne(UserExams, {exam: exam, candidate: candidate},
        {relations: ["exam", "candidate", "precedence", "precedence.exam", "precedence.candidate",
                "questions", "questions.question", "questions.chosenAnswer", "questions.answers"]});
};



let getUserEx = async (req) => {
    return await connection.manager.findOne(UserExams, {id: req.session.userExamID},
        {relations: ["exam","exam.questions", "candidate","precedence","precedence.exam","precedence.candidate", "questions", "questions.question", "questions.chosenAnswer", "questions.answers"]});

};
let updateSolvingUserExam = async (req)=> {


    //user exam should come from sessions
    let userExam = await getUserEx(req);
    let questionDetail = req.body.questionDetail;
    let chosenAnsID = req.body.chosenAnswerID;
    await connection.getRepository(QuestionDetail).update({userExam: userExam, question: questionDetail.question},
        {chosenAnswer: chosenAnsID});
};

let updateUserExamResults = async (req) => {

    let userExam =await getUserEx(req);
    let score = 0 ;
    let numOfQuestions= userExam.questions.length;
    userExam.questions.forEach((questionDetail)=>{
        if (questionDetail.chosenAnswer && questionDetail.chosenAnswer.correctness)
        {
            score+= 1/numOfQuestions;
        }
    });
    let passed = false;
    if(score>= .5){
        passed = true;
    }
    await connection.getRepository(UserExams).update({id:userExam.id},{passed:passed, score:score});

};


module.exports ={
    event,
    save,
    findByCandidateAndExamAndPosition,
    findByCandidateAndPosition,
    findById,
    getUserExam,updateSolvingUserExam, updateUserExamResults,getUserEx
};