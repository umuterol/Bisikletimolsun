const { successMessage, errorMessage } = require("../helpers/resMessage");
const { Op } = require("sequelize");
class Controller {
    constructor(model) {
        this.model = model;
    }

    getAllData = async (req, res) => {
        try {
            const data = await this.model.findAll();
            if (data.length === 0) {
                return errorMessage(res, "No data found.", 400)
            }
            return successMessage(res, data);
        } catch (error) {
            return errorMessage(res, error, 400)
        }
    };

    create = async (req, res) => {
        try {
            const data = await this.model.create(req.body);
            return successMessage(res, data, "Data created.");
        } catch (error) {
            return errorMessage(res, error, 400);
        }
    };

    getDataByPk = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await this.model.findByPk(id);

            if (!data) {
                return errorMessage(res, "Data not found by id", 400);
            }
            return successMessage(res, data);
        } catch (error) {
            return errorMessage(res, error, 400)
        }
    };

    updateData = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await this.model.findByPk(id);
            if (!data) {
                return errorMessage(res, "No data found with this id.", 400);
            }
            const updatedData = await data.update(req.body);
            return successMessage(res, updatedData, "Updating is successfully.");
        } catch (error) {
            return errorMessage(res, error, 400);
        }
    };

    destroyData = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await this.model.findByPk(id);
            if (!data) {
                return errorMessage(res, "No data found with this id.", 400);
            }
            await data.destroy();
            return successMessage(res, data, "Data deleted.");
        } catch (error) {
            return errorMessage(res, error, 400);
        }
    };

    getDataByQuery = async (req, res) => {
        const query = req.query;
        try {
            const data = await this.model.findAll({
                where: query,
            });

            if (data.length === 0) {
                return errorMessage(res, "No data found.", 400);
            }
            return successMessage(res, data);
        } catch (error) {
            return errorMessage(res, error, 400);
        }
    };


    getDataByQueryOr = async (req, res) => {
        const query = req.query;
        try {
            const data = await this.model.findAll({
                where: {
                    [Op.or]: query
                },
            });

            if (data.length === 0) {
                return errorMessage(res, "No data found.", 400);
            }
            return successMessage(res, data);
        } catch (error) {
            return errorMessage(res, error, 400);
        }
    };
}



module.exports = Controller;
