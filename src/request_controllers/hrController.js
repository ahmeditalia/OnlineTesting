const app = require('../app').app;
const userExamRepo = require("../database_controller/userExamController").Emitter;





app.post("/addUserExams",(req,res)=>{
    var exam = req.body;
    console.log(exam);
});

app.post("/showUserExams",(req,res)=>{

});