
const metadata = require("reflect-metadata");
const eventEmitter = require("events");
const Position = require("../entity/Position").Position;
const getConnection = require("typeorm").getConnection();
let Emitter = new eventEmitter();


let findByHR = async function (HR)
{
        let positionRepo = await getConnection.getRepository(Position);
        let positions = await positionRepo.find(
            {
                where: {hr: HR}
            });
        return positions;
};


Emitter.on("save",async (position) =>{
    let positionRepo = await getConnection.getRepository(Position);
    await positionRepo.save(position);
});


let getAllPositions = async () => {
    return await getConnection.getRepository(Position).find();
};


module.exports ={
    Emitter,
    findByHR,
    getAllPositions
};