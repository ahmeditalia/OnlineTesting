const PositionApplication = require("../entity/PositionApplication").PositionApplication;
const metadata = require("reflect-metadata");
const typeorm = require("typeorm");
const eventEmitter = require("events");

let Emitter = new eventEmitter();



let findByPositionID = function (Position)
{
    return typeorm.createConnection().then(async connection => {
        let positionRepo = connection.getRepository(PositionApplication);
        let positions = await positionRepo.find(
            {
                relations :["candidate"],
                where: {position: Position}
            });
        connection.close();
        return positions;
    }).catch(error =>
    {
        console.log(error);
        connection.close();
    });
};

let findByPositionIDAndAccepted = function (Position,acceptance)
{
    return typeorm.createConnection().then(async connection => {
        let positionRepo = connection.getRepository(PositionApplication);
        let positions = await positionRepo.find(
            {
                relations :["candidate"],
                where: {position: Position , accepted: acceptance}
            });
        connection.close();
        return positions;
    }).catch(error =>
    {
        console.log(error);
        connection.close();
    });
};


let findByPositionIDAndSeen = function (Position,seen)
{
    return typeorm.createConnection().then(async connection => {
        let positionRepo = connection.getRepository(PositionApplication);
        let positions = await positionRepo.find(
            {
                relations :["candidate"],
                where: {position: Position , seen: seen}
            });
        connection.close();
        return positions;
    }).catch(error =>
    {
        console.log(error);
        connection.close();
    });
};

//Emitter.on("save1",(application) =>{
let save = function(application){
    typeorm.createConnection().then(async connection => {
        let applicationRepo = connection.getRepository(PositionApplication);
        let temp = await applicationRepo.save(application);
        connection.close();
    }).catch(error =>
    {
        console.log(error);
        connection.close();
    });
};


module.exports ={
    Emitter,
    findByPositionID,
    findByPositionIDAndAccepted,
    findByPositionIDAndSeen,
    save
};