const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require("path");
let location = path.join(__dirname, "../public");
console.log(location);
let app = express();
// app.use(session);
app.use(express.static(location));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: "secret", saveUninitialized: true, resave: false}));

app.listen(3000, () => {
    console.log("application has started on port 3000");
});

module.exports = {
    app
};
require("./request_controllers/registration");
require("./request_controllers/login");


