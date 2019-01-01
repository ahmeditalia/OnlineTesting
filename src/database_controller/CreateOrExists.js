const type_orm = require("typeorm");
const HR = require("../entity/HR").HR;
const Candidate = require("../entity/Candidate").Candidate;
const connection = require("typeorm").getConnection();

checkExistsOrCreateHR = async function (userJSON) {
    const user = new HR();
    user.username = userJSON.username;
    user.email = userJSON.email;
    user.password = userJSON.password;
    user.contactNumber = userJSON.contactNumber;
    const exists_name = await connection.manager.findOne(HR, {where: {username: user.username}});
    const exists_email = await connection.manager.findOne(HR, {where: {email: user.email}});
    if (exists_name == null && exists_email == null) {
        await connection.manager.save(user);
        return true;
    }
    return false;
};


checkExistsOrCreateCandidate = async function (userJSON) {
    const user = new Candidate();
    user.username = userJSON.username;
    user.email = userJSON.email;
    user.password = userJSON.password;
    user.contactNumber = userJSON.contactNumber;
    user.cv = userJSON.cv;
    const exists_name = await connection.manager.findOne(HR, {where: {username: user.username}});
    const exists_email = await connection.manager.findOne(HR, {where: {email: user.email}});
    if (exists_name == null && exists_email == null) {
        await connection.manager.save(user);
        return true;
    }
    return false;
};


module.exports ={
    checkExistsOrCreateHR,
    checkExistsOrCreateCandidate
};