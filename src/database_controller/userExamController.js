const UserExams = require("../entity/UserExams").UserExams;
const metadata = require("reflect-metadata");
const typeorm = require("typeorm");
const eventEmitter = require("events");

var Emitter = new eventEmitter();

Emitter.on("getUserExam",(userID) =>{
    typeorm.createConnection().then(async connection => {
        var userExamRepo = connection.getRepository(UserExams);
        var exams = await userExamRepo.find(
            {
                where: {candidate: userID},
                relation:[exam,candidate,precedence]
            });
        connection.close();
        return exams;

    }).catch(error =>
    {
        console.log(error);
        connection.close();
    });
});


Emitter.on("addUserExam",(userExam) =>{
    typeorm.createConnection().then(async connection => {
        var userExamRepo = connection.getRepository(UserExams);
        await userExamRepo.save(userExam);
        connection.close();
    }).catch(error =>
    {
        console.log(error);
        connection.close();
    });
});

module.exports ={
    Emitter
};