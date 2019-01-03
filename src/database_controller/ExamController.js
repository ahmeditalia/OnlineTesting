
const Answer =require('../entity/Answer').Answer;
const Question = require('../entity/Question').Question;
const Exam = require('../entity/Exam').Exam;
const eventEmitter = require("events");
const connection = require("typeorm").getConnection();



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

let getAllExams = async () => {
    return (await connection.getRepository(Exam).find());

};

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


let getExamDetails=  async (examName) => {
    let exam = await connection.getRepository(Exam).findOne({name: examName}, {relations: ["questions", "questions.answers"]});
    let data = [];
    if (exam.hasOwnProperty('questions')) {
        exam.questions.forEach(question => {
            data.push({questionName: question.name, answers: question.answers});
        });
    }
    return data;
};


let getExamByName = async (name) => {
    return (await connection.getRepository(Exam).findOne({where:{name:name}}));
};

////////////////////////////////////////////////////////////

module.exports = {
    event,getAllExams,getExamDetails,getExamByName
};
