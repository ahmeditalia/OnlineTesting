const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
let createConnection = require("typeorm").createConnection();

createConnection.then(()=> {
    let location = path.join(__dirname,"../public");
    console.log(location);
    let app = express();
    app.use(express.static(location));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.listen(3000,()=>{
        console.log("application has started on port 3000");
    });

    module.exports ={
        app
    };

    // const hr = require("./request_controllers/hrController");
    const exam= require('./request_controllers/Exam');
    const userExam= require('./request_controllers/UserExam');

}).catch(error =>
{
    console.log(error);
});



