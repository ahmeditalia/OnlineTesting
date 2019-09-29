const app = require("../app").app;
let i =1;
app.post('/reactTest',(req,res)=>{
    console.log("came here "+i++);
    res.send({data:"hellow from node "+req.body.name});
});

app.get('/reactTestGet',(req,res)=>{
   console.log(req.query) ;
   res.send({data:"hellow from node "+req.query.name})
});