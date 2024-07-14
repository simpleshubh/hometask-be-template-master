const { Profile } = require("../model");
const BaseService = require('./baseService');

class ProfileService extends BaseService {
    constructor() {
        super(Profile);
    }
}

module.exports = new ProfileService();