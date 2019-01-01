
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
            res.send({url:'/HR.html'});
            // let location = path.join(__dirname,"../../public");
            //
            // res.writeHead(200,{'Content-Type': 'text/html'})
            // fs.readFile(path.join(location,'/HR.html'),null, (error, data)=>{
            //     if(error){
            //         res.writeHead(404);
            //         res.write("not fount");
            //         console.log("not fount");
            //     }
            //     else{
            //         res.write(data);
            //         console.log(data);
            //     }
            //     res.end();
            // });
            // let location = path.join(__dirname,"../../public");
            // // console.log(location);
            // res.sendFile(path.join(location,'/HR.html'));
            // res.sendFile('HR.html');
        }
        else
            res.redirect('/ManageExams.html');
    }
    else
    {
        res.end('{"success" : "Not Exists"}');
    }
});