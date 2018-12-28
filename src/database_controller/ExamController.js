
const shuffle = require('shuffle-array');
const UserExams = require('../entity/UserExams').UserExams;
const Candidate = require('../entity/Candidate').Candidate;
const QuestionDetail = require('../entity/QuestionDetail').QuestionDetail;
const Answer =require('../entity/Answer').Answer;
const Question = require('../entity/Question').Question;
const Exam = require('../entity/Exam').Exam;
const eventEmitter = require("events");
const typeorm = require("typeorm");

let event = new eventEmitter();

event.on('addExam',(res, examName)=>{
    typeorm.createConnection().then(async connection => {

        let newExam = new Exam();
        newExam.name = examName;
        // newExam.questions = [];
        await connection.manager.save(newExam);
        res.send({status: true});

        await connection.close();
    }).catch(error => console.log(error));
});

event.on('addQuestion',(res, examName,questionName)=>{
    typeorm.createConnection().then(async connection => {
        let examRepo = connection.getRepository(Exam);
        let qRepo = connection.getRepository(Question);
        let exam =  await examRepo.findOne({name: examName});
        let question = new Question();
        question.name = questionName;
        question.exam =exam;
        await qRepo.save(question);
        res.send({status: true});
        await connection.close();

    }).catch(error => console.log(error));
});

event.on('addAnswer',(res, answerJSON)=>{
    typeorm.createConnection().then(async connection => {
        let qRepo = connection.getRepository(Question);
        let answer = new Answer();
        answer.name = answerJSON.name;
        answer.correctness = (answerJSON.correctness === 'true');
        answer.question = await qRepo.findOne({name: answerJSON.questionName });
        await connection.manager.save(answer);
        res.send({status: true});
        await connection.close();
    }).catch(error => console.log(error));
});

event.on('getAllExams',(res)=>{
     typeorm.createConnection().then(async connection => {
        res.send( await connection.getRepository(Exam).find());
        await connection.close();
    }).catch(error => console.log(error));
});


event.on('getExamDetails',(res, examName)=>{
    typeorm.createConnection().then(async connection => {
        let exam = await connection.getRepository(Exam).findOne({name: examName},{ relations: ["questions","questions.answers"] });
        let data=[];
         if(exam.hasOwnProperty('questions')) {
            exam.questions.forEach(question => {
                data.push({questionName: question.name, answers: question.answers});
            });
         }
         res.send(data);
        await connection.close();
    }).catch(error => console.log(error));
});




////////////////////////////////////////////////////////////
event.on('generateUserExam',(res, examName, userName)=>{
    typeorm.createConnection().then(async connection => {
        let exam = await connection.getRepository(Exam).findOne({name: examName},{ relations: ["questions"] });
        let candidate = await connection.getRepository(Candidate).findOne({username: userName});
        let userExam = await connection.manager.findOne(UserExams, {exam: exam, candidate: candidate},{relations:["exam","candidate","questions","questions.answers"]});
        let arrLength =2;
        let generatedQuestions = getRandomElements(exam.questions,arrLength);
        for( let i =0; i<arrLength; i++) {
            let questionDetails = new QuestionDetail();
            questionDetails.userExam = userExam;
            questionDetails.question = generatedQuestions[i];
            let wrongAns = await connection.manager.find(Answer,{question: questionDetails.question , correctness:false});
            questionDetails.answers = getRandomElements(wrongAns,3);
            let correctAns = await connection.manager.findOne(Answer,{question: questionDetails.question , correctness:true});
            questionDetails.answers.push(correctAns);
            shuffle(questionDetails.answers);
            await connection.manager.save(questionDetails);
        }
        // await userExam.reload();
        userExam = await connection.manager.findOne(UserExams, {exam: exam, candidate: candidate},
            {relations:["exam","candidate","questions","questions.question","questions.chosenAnswer","questions.answers"]});
        // console.log(userExam);
        res.send(userExam);
        await connection.close();
    }).catch(error => console.log(error));
});


let getUserExam = ( examName, userName)=>{
    return typeorm.createConnection().then(async connection => {
        let exam = await connection.getRepository(Exam).findOne({name: examName},{ relations: ["questions"] });
        let candidate = await connection.getRepository(Candidate).findOne({username: userName});
        let userExam = await connection.manager.findOne(UserExams, {exam: exam, candidate: candidate},
            {relations:["exam","candidate","questions","questions.question","questions.chosenAnswer","questions.answers"]});
        await connection.close();
        return userExam;
    }).catch(error => console.log(error));
};


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

module.exports = {
    event,getUserExam
};
