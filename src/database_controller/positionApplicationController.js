const metadata = require("reflect-metadata");
const getConnection = require("typeorm").getConnection();
const eventEmitter = require("events");
const PositionApplication = require("../entity/PositionApplication").PositionApplication;

let Emitter = new eventEmitter();



let findByPositionID = async function (Position)
{
    let positionRepo = await getConnection.getRepository(PositionApplication);
    let positions = await positionRepo.find(
        {
            relations :["position","candidate"],
            where: {position: Position}
        });
    return positions;
};

let findByPositionIDAndAccepted = async function (Position,acceptance)
{
    let positionRepo = await getConnection.getRepository(PositionApplication);
    let positions = await positionRepo.find(
        {
            relations :["position","candidate"],
            where: {position: Position , accepted: acceptance}
        });
    return positions;
};


let findByPositionIDAndSeen = async function (Position,seen)
{
    let positionRepo = await getConnection.getRepository(PositionApplication);
    let positions = await positionRepo.find(
        {
            relations :["position","candidate"],
            where: {position: Position , seen: seen}
        });
    return positions;
};

let findByPositionIDAndAcceptedAndSeen = async function (Position,acceptance,seen)
{
    let positionRepo = await getConnection.getRepository(PositionApplication);
    let positions = await positionRepo.find(
        {
            relations :["position","candidate"],
            where: {position: Position ,accepted: acceptance, seen: seen}
        });
    return positions;
};

let save = async function (application){
        let applicationRepo = await getConnection.getRepository(PositionApplication);
        await applicationRepo.save(application);
};


//Emitter.on("update",(application) =>{
let update = async function (application){
    let applicationRepo = await getConnection.getRepository(PositionApplication);
    await applicationRepo.update(
        {position: application.position,candidate: application.candidate},
        {accepted: application.accepted, seen: application.seen});
};
let getApliedPositions = async (user) => {
    return await getConnection.getRepository(PositionApplication).find({where:{candidate: user},relations:['position','position.hr']});

};
module.exports ={
    update,
    findByPositionID,
    findByPositionIDAndAccepted,
    findByPositionIDAndSeen,
    findByPositionIDAndAcceptedAndSeen,
    getApliedPositions,save
};