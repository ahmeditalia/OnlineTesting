
const session = require('express-session');
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
    app.use(session({secret: "secret", saveUninitialized: true, resave: false}));

    app.set('views',location);
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');

    app.listen(3000,()=>{
        console.log("application has started on port 3000");
    });

    module.exports ={
        app,path
    };

    const hr = require("./request_controllers/hrController");
    const exam= require('./request_controllers/Exam');
    const userExam= require('./request_controllers/UserExam');
    const login = require('./request_controllers/login');
    const register = require('./request_controllers/registration');

}).catch(error =>
{
    console.log(error);
});



