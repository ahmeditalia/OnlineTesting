const type_orm = require("typeorm");
const HR = require("../entity/HR").HR;
const Candidate = require("../entity/Candidate").Candidate;


findById = function (Id) {
    return type_orm.createConnection().then(async connection => {
        console.log("HR Check exits or creat...", Id);
        const exists_user = await connection.getRepository(HR).findOne({where: {id: Id}});
        if (exists_user != null) {
            connection.close();
            return true;
        }
        connection.close();
        return false;
    });
};


findByUsernamePasswordHR = function (username, password) {
    return type_orm.createConnection().then(async connection => {
        console.log("HR Check exits or creat...", username, password);
        const user = new HR();
        user.username = username;
        user.password = password;
        const exists_user = await connection.getRepository(HR).findOne({
            where: {
                username: user.username,
                password: user.password
            }
        });
        if (exists_user != null) {
            // console.log(exists_user);
            connection.close();
            return true;
        }
        connection.close();
        return false;
    });
};


findByUsernamePasswordCandidate = function (username, password) {
    return type_orm.createConnection().then(async connection => {
        console.log("Candidate Check exits or creat...", username, password);
        const user = new Candidate();
        user.username = username;
        user.password = password;
        const exists_user = await connection.getRepository(Candidate).find({
            where: {
                username: user.username,
                password: user.password
            }
        });
        if (exists_user != null) {
            connection.close();
            return true;
        }
        connection.close();
        return false;
    });
};


module.exports = {
    findByUsernamePasswordHR,
    findByUsernamePasswordCandidate
};