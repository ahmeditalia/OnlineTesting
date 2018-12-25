const metadata = require("reflect-metadata");
const typeorm = require("typeorm");
const User = require("../entity/User").User;
const eventEmitter = require("events");

var Emitter = new eventEmitter();

Emitter.on("checkuser",(userJSON) =>{
    typeorm.createConnection().then(async connection => {
        console.log("Check exits or creat...");
        const user = new User();
        user.firstName = userJSON.firstname;
        user.lastName = userJSON.lastname;
        user.username = userJSON.username;
        user.email = userJSON.email;
        user.password = userJSON.password;
        const exemail = await connection.manager.findOne(User,{email:user.email});
        const exusername = await connection.manager.findOne(User,{username:user.username});
        var result;
        if(exemail==null && exusername==null){
            await connection.manager.save(user);
            result="suc";
        }
        else{
            result="fai";
        }
        connection.close();
    });
});


module.exports ={
    Emitter
};