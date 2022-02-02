const { errorMessage, successMessage } = require("../../helpers/resMessage");

const db = require('../../models');
const model = db.bicycle;
const Controller = require("../Controller");
const controller = new Controller(model);


const random_hex_code = async () => {
    let n, randomHexCode;
    while (true) {
        n = (Math.random() * 0xfffff * 1000000).toString(16);
        randomHexCode = n.slice(0, 6);
        const existingData = await model.findByPk(randomHexCode);
        if (!existingData)
            break;
    }
    return randomHexCode;
};


const create = async (req, res) => {
    const bicycleId = await random_hex_code();
    const data = {
        ...req.body,
        id: bicycleId,
    }
    try {
        const createdData = await model.create(data);
        console.log("createdData " + createdData)
        return successMessage(res, createdData, "Data created.");
    } catch (error) {
        return errorMessage(res, error, 400);
    }
};

const getAllBicyclesWithCoords = async (req, res) => {
    const query = req.query;
    try {
        const bcData = [];
        const data = await model.findAll({
            where: query,
        });

        if (data.length === 0) {
            return errorMessage(res, "No data found.", 400);
        }

        await Promise.all(data.map(async (bicycle) => {
            const { lat, lng } = await db.bicycle_coords.findByPk(bicycle.id)
            bcData.push({
                bicycle,
                coords: { lat, lng }
            })
        }))
        return successMessage(res, bcData);
    } catch (error) {
        return errorMessage(res, error, 400);
    }
};


module.exports = {
    create,
    getAllData: controller.getAllData,
    getDataByPk: controller.getDataByPk,
    updateData: controller.updateData,
    destroyData: controller.destroyData,
    getDataByQuery: controller.getDataByQuery,
    getDataByQueryOr: controller.getDataByQueryOr,
    getAllBicyclesWithCoords,
}