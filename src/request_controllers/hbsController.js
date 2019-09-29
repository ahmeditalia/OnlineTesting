
var express = require('express');
var app = express();
var hbs = require('express-handlebars');

app.engine('hbs', hbs(
    { // Here we define what format you will use (That means what's at the end of each file, for example test.handlebars or test.hbs.hbs)
    extname: '.hbs',
    defaultLayout: 'temp', // That's the name of your template file. In my case it's main.handlebars
    layoutsDir:'src/view/serverside/layout' // That's the directory where the template file is
}));

app.set('views', 'src/view/serverside'); // Here you give express the information that it has to look at all files that are in the path /views
//app.use(express.static('src/view'));
app.set('view engine', 'hbs'); // Here you say express that you are using handlebars to build your website

let candidate ={
    name: 'sa2a',
    age: 22
};
app.get('/', function (req, res) { // That's a simple GET request (This GET request gets triggered when you enter http://localhost/home for example)

    cands =[candidate,candidate,candidate];

    console.log(cands);

    res.render('hbs',{
        candidates: cands
    });  // Here we render the index.handlebars file (that is in the /views folder)
});

app.listen(3000,()=>{
    console.log("listening ...");
});