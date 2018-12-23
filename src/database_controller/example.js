const Candidate = require("../entity/Candidate").Candidate;

const metadata = require("reflect-metadata");
const typeorm = require("typeorm");
const User = require("../entity/User").User;
const eventEmitter = require("events");

var Emitter = new eventEmitter();

Emitter.on("add",(userJSON) =>{
    typeorm.createConnection().then(async connection => {
        console.log("Inserting a new user into the database...");
        const user = new Candidate();
        user.username = "ahmed";
        user.password = "1234";
        user.email = "ahmed@yahoo.com";
        user.contactNumber = "01144152537";
        user.cv = "ay 7aga";
        await connection.manager.save(user);
        console.log("Saved a new user with id: " + user.id);

        console.log("Loading users from the database...");
        const users = await connection.manager.find(Candidate);
        console.log("Loaded users: ", users);
    }).catch(error => console.log(error));
});


module.exports ={
  Emitter
};