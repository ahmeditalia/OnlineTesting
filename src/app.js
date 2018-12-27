const UserController = require("./request_controllers/registration").Emitter;
const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

var location = path.join(__dirname, "../public");
console.log(location);
var app = express();
app.use(express.static(location));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    // res.redirect("/register.html");
});


app.post("/request_register", (req, res) => {
    let user = req.body;
    if (user.cv == "") {
        UserController.emit("HR_register", {
            username: user.username,
            password: user.password,
            email: user.email,
            contactNumber: user.contactNumber
        });
    } else {
        UserController.emit("Candidate_register", {
            username: user.username,
            password: user.password,
            email: user.email,
            contactNumber: user.contactNumber,
            cv: user.cv
        });
    }
    // console.log(res);
});

app.listen(3000, () => {
    console.log("application has started on port 3000");
});

