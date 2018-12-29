const Position = require("../entity/Position").Position;
const metadata = require("reflect-metadata");
const typeorm = require("typeorm");
const eventEmitter = require("events");

let Emitter = new eventEmitter();


let findByHR = function (HR)
{
    return typeorm.createConnection().then(async connection => {
        let positionRepo = connection.getRepository(Position);
        let positions = await positionRepo.find(
            {
                where: {hr: HR}
            });
        connection.close();
        return positions;
    }).catch(error =>
    {
        console.log(error);
        connection.close();
    });
};


//Emitter.on("save",(position) =>{
let save = function(position){
    typeorm.createConnection().then(async connection => {
        let positionRepo = connection.getRepository(Position);
        await positionRepo.save(position);
        connection.close();
    }).catch(error =>
    {
        console.log(error);
        connection.close();
    });
};


module.exports ={
    Emitter,
    findByHR,
    save
};