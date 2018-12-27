const eventEmitter = require("events");
const typeorm = require("typeorm");
const User = require("../entity/User").User;
const HR = require("../entity/HR").HR;
const Candidate = require("../entity/Candidate").Candidate;
let em = new eventEmitter();
// existsOrCreateHR = function(userJSON) {

em.on("existsOrCreateHR",(userJSON)=>{
    typeorm.createConnection().then( async connection => {
        console.log("Check exits or creat...", userJSON);
        const user = new HR();
        user.username = userJSON.username;
        user.email = userJSON.email;
        user.password = userJSON.password;
        user.contactNumber = userJSON.contactNumber;
        const exsitsEmail = await connection.manager.findOne(HR, {email: user.email});
        const exsitsUsername = await connection.manager.findOne(HR, {username: user.username});
        if (exsitsEmail == null && exsitsUsername == null) {
            connection.manager.save(user);
            // return true;
        }
        // return false;
    });
});


existsOrCreateCandidate = function(userJSON) {
    return typeorm.createConnection().then(async connection => {
        console.log("Check exits or creat...", userJSON);
        const user = new Candidate();
        user.username = userJSON.username;
        user.email = userJSON.email;
        user.password = userJSON.password;
        user.contactNumber = userJSON.contactNumber;
        user.cv = userJSON.cv;
        const exsitsEmail = await connection.manager.findOne(Candidate, {email: user.email});
        const exsitsUsername = await connection.manager.findOne(Candidate, {username: user.username});
        if (exsitsEmail == null && exsitsUsername == null) {
            connection.manager.save(user);
            return true;
        }
        return false;
    }).catch(error =>console.log(error));
};


module.exports ={
    // existsOrCreateHR,
    existsOrCreateCandidate,
    em
};