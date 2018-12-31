
const shuffle = require('shuffle-array');
const UserExams = require('../entity/UserExams').UserExams;
const Candidate = require('../entity/Candidate').Candidate;
const QuestionDetail = require('../entity/QuestionDetail').QuestionDetail;
const Answer =require('../entity/Answer').Answer;
const Question = require('../entity/Question').Question;
const Exam = require('../entity/Exam').Exam;
const eventEmitter = require("events");
const typeorm = require("typeorm");
const connection = typeorm.getConnection();


let event = new eventEmitter();

event.on('addExam', async (res, examName) => {

    let newExam = new Exam();
    newExam.name = examName;
    // newExam.questions = [];
    await connection.manager.save(newExam);
    res.send({status: true});

});

event.on('addQuestion', async (res, examName, questionName) => {
    let examRepo = connection.getRepository(Exam);
    let qRepo = connection.getRepository(Question);
    let exam = await examRepo.findOne({name: examName});
    let question = new Question();
    question.name = questionName;
    question.exam = exam;
    await qRepo.save(question);
    res.send({status: true});
});

event.on('addAnswer', async (res, answerJSON) => {
    let qRepo = connection.getRepository(Question);
    let answer = new Answer();
    answer.name = answerJSON.name;
    answer.correctness = (answerJSON.correctness === 'true');
    answer.question = await qRepo.findOne({name: answerJSON.questionName});
    await connection.manager.save(answer);
    res.send({status: true});
});

event.on('getAllExams', async (res) => {
    res.send(await connection.getRepository(Exam).find());
});


event.on('getExamDetails', async (res, examName) => {
    let exam = await connection.getRepository(Exam).findOne({name: examName}, {relations: ["questions", "questions.answers"]});
    let data = [];
    if (exam.hasOwnProperty('questions')) {
        exam.questions.forEach(question => {
            data.push({questionName: question.name, answers: question.answers});
        });
    }
    res.send(data);
});




////////////////////////////////////////////////////////////
event.on('getUserExam', async (req, res) => {


    //user exam should come from sessions
    let exam = await connection.getRepository(Exam).findOne({name: req.body.examName}, {relations: ["questions"]});
    let candidate = await connection.getRepository(Candidate).findOne({username: req.body.userName});
    let userExam = await connection.manager.findOne(UserExams, {exam: exam, candidate: candidate},
        {relations: ["exam", "candidate","precedence","precedence.exam","precedence.candidate", "questions", "questions.question", "questions.chosenAnswer", "questions.answers"]});
    let status = false;
    let numOfQuestions = 3;

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
                questionDetails.answers.push(getRandomElements(correctAnswers,1)[0]);
                shuffle(questionDetails.answers);
                questionDetails.userExam = userExam;
                await connection.manager.save(questionDetails);
                // userExam.questions.push(questionDetails);
            }
            userExam = await connection.manager.findOne(UserExams, {exam: exam, candidate: candidate},
                {relations: ["exam", "candidate","precedence","precedence.exam","precedence.candidate", "questions", "questions.question", "questions.chosenAnswer", "questions.answers"]});
        }
        // await userExam.reload();
        status = true;
    }
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

let updateSolvingUserExam = async (questionDetail, chosenAnsID)=> {
    let userExam = await getUserExam('Java', 'sa2a');
    //user exam should come from sessions

    await connection.getRepository(QuestionDetail).update({userExam: userExam, question: questionDetail.question},
        {chosenAnswer: chosenAnsID});
};

let updateUserExamResults = async (examName, userName) => {
    let userExam = await getUserExam(examName, userName);//sessions
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

module.exports = {
    event,getUserExam,updateSolvingUserExam, updateUserExamResults
};
