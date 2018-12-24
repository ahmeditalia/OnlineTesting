
const Exam = require("../entity/Exam").Exam;
const Question = require("../entity/Question").Question;
const UserExams = require("../entity/UserExams").UserExams;
const QuestionDetail = require("../entity/QuestionDetail").QuestionDetail;
const Answer = require("../entity/Answer").Answer;
const Candidate = require("../entity/Candidate").Candidate;
const User = require("../entity/User").User;

const metadata = require("reflect-metadata");
const typeorm = require("typeorm");
const eventEmitter = require("events");

var Emitter = new eventEmitter();

Emitter.on("add",(userJSON) =>{
    typeorm.createConnection().then(async connection => {
        console.log("Inserting a new user into the database...");

        var answer1 = new Answer();
        answer1.answer = "new Answer details 1";
        answer1.correctness = false;

        var answer2 = new Answer();
        answer2.answer= "new answer details 2";
        answer2.correctness = true;

        var answerRepo = connection.getRepository(Answer);
        await answerRepo.save(answer1);
        await answerRepo.save(answer2);
        console.log("Answers saved: ");

        var question = new Question();
        question.answers = [answer1, answer2];
        question.name = "a qustoin";
        await connection.manager.save(question);

        var exam = new Exam();
        exam.name = "java";
        exam.questions = [question];
        await connection.manager.save(exam);

        var candidate = new Candidate();
        candidate.username ="sa2a";
        candidate.password = "dsfsg";
        candidate.contactNumber ="213264646465";
        candidate.email = "kahled.elsaka25@gmail.com";
        candidate.cv = "Cv path ";
        await connection.manager.save(candidate);

        var userExam = new UserExams();
        //userExam.precedence = null;
        userExam.candidate = candidate;
        userExam.passed=true;
        userExam.exam = exam;
        userExam.score = 52;
        await connection.manager.save(userExam);

        var questionDetails = new QuestionDetail();
        questionDetails.userExam = userExam;
        questionDetails.answers = [answer1,answer2];
        questionDetails.chosenAnswer = answer2;
        questionDetails.question = question;
        await connection.manager.save(questionDetails);


        // var qd = await qusDetailsReop.find({ relations: ["chosenAnswer","answers"] });
        // console.log("Qeustion details: ",JSON.stringify(qd,null, 5));
        //


        connection.close();
    }).catch(error => console.log(error));
});


module.exports ={
  Emitter
};