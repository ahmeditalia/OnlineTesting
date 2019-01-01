const type_orm = require("typeorm");
const HR = require("../entity/HR").HR;
const Candidate = require("../entity/Candidate").Candidate;
const typeorm = require("typeorm");
const connection = typeorm.getConnection();

findById = async function (Id) {
    console.log("HR Check exits or creat...", Id);
    const exists_user = await connection.getRepository(HR).findOne({where: {id: Id}});
    if (exists_user != null) {
        return true;
    }
    return false;
};


findByUsernamePasswordHR = async function (username, password) {
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
        console.log(exists_user);
        return true;
    }
    return false;
};


findByUsernamePasswordCandidate = async function (username, password) {
    console.log("Candidate Check exits or creat...", username, password);
    const user = new Candidate();
    user.username = username;
    user.password = password;
    const exists_user = await connection.getRepository(Candidate).findOne({
        where: {
            username: user.username,
            password: user.password
        }
    });
    if (exists_user != null) {
        console.log(exists_user);

        return true;
    }
    return false;
};


module.exports = {
    findByUsernamePasswordHR,
    findByUsernamePasswordCandidate
};