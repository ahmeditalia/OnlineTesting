const metadata = require("reflect-metadata");
const typeorm = require("typeorm");
const User = require("../entity/User").User;
const eventEmitter = require("events");
const chuser = require("../database_controller/usercheck");
const ex = require("../database_controller/example");
let Emitter = new eventEmitter();

Emitter.on("HR_register",async (user)=>{
    // let result = await chuser.existsOrCreateHR(user);
    let result = chuser.em.emit("existsOrCreateHR",user);
    if(result)
        console.log("created");
    else
        console.log("exists");
    // res(result);
});

Emitter.on("Candidate_register", (user)=>{
    ex.Emitter.emit("add",user);
    // let result = await chuser.existsOrCreateCandidate(user);
    // if(result)
    //     console.log("created");
    // else
    //     console.log("exists");
    // res(result);
});

module.exports = {
  Emitter
};