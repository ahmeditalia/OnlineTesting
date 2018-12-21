const UserController = require("./database_controller/example").Emitter;
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

var location = path.join(__dirname,"../public");
console.log(location);
var app = express();
app.use(express.static(location));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/",(req,res)=>{
    res.render("/login.html");
});



app.post("/register",(req,res)=>{
    var user = req.body;
    UserController.emit("add",user);
    console.log("we came here");
});

app.listen(3000,()=>{
    console.log("application has started on port 3000");
})

