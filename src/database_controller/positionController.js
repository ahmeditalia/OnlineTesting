
const metadata = require("reflect-metadata");

const Position = require("../entity/Position").Position;
const getConnection = require("typeorm").getConnection();


let findByHR = async function (HR)
{
        let positionRepo = await getConnection.getRepository(Position);
        let positions = await positionRepo.find(
            {
                where: {hr: HR}
            });
        return positions;
};


let save = async (position) =>{
    let positionRepo = await getConnection.getRepository(Position);
    await positionRepo.save(position);
};


let getAllPositions = async () => {
    return await getConnection.getRepository(Position).find({relations:["hr"]});
};


module.exports ={
    findByHR,
    getAllPositions,
    save
};