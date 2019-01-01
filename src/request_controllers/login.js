
const HR = require('../entity/HR').HR;
const appFile = require("../app");
let app = appFile.app;
let path = appFile.path;
const userFind = require("../database_controller/userFind");

let fs= require('fs');

app.post("/getUserById", async (req,res)=>{

});


app.post("/login", async (req, res) => {
    let user = req.body;
    let result;
    if (user.hr) {
        result = await userFind.findByUsernamePasswordHR(user.username, user.password);
    }
    else {
        result = await userFind.findByUsernamePasswordCandidate(user.username, user.password);
    }
    if(result)
    {
        req.session.user = result;
        if(result instanceof HR)
        {
            res.send({status:true, url:'/HR.html'});
        }
        else
            res.send({status:true, url:'/candidate.html'});
    }
    else
    {
        res.end({status:false});
    }
});

app.post("/getUserInfo" ,async (req,res)=>{
    let user = await userFind.getUserInfo(req,res);
    res.send(user);
});
