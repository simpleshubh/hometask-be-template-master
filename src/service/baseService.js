const AppError = require("../exception/appError");
const ERROR_MESSAGE = require("../constant/error");

class BaseService {
    constructor(model) {
        this.model = model;
    }

    async getById(id) {
        const item = await this.model.findByPk(id);
        if (!item) {
            throw new AppError(400, ERROR_MESSAGE.ITEM_NOT_FOUND);
        }
        return item;
    }

    async save(data) {
        try {
            const item = await this.model.create(data);
            return item;
        } catch (error) {
            throw new AppError(500, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
        }
    }

    async update(id, data) {
        try {
            const item = await this.getById(id);
            await item.update(data);
            return item;
        } catch (error) {
            throw new AppError(500, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
        }
    }
}

module.exports = BaseService;