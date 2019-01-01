const app = require("../app").app;
const userFind = require("../database_controller/userFind");


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
        req.session.user = user;
        res.end('{"success" : "Exists"}');
    }
    else
    {
        res.end('{"success" : "Not Exists"}');
    }
});