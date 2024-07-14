const { Contract } = require("../model");
const { Op } = require('sequelize');
const BaseService = require('./baseService');
const AppError = require("../exception/appError");
const ERROR_MESSAGE = require("../constant/error");


class ContractService extends BaseService {
    constructor() {
        super(Contract);
    }

    async getAllContractsByProfileId(profileId) {
        return await Contract.findAll({
            where: {
                [Op.or]: [
                    { contractorId: profileId },
                    { clientId: profileId }
                ]
            }
        });
    }

    async getContractByClientIdAndContractId(clientId, id) {
        return await Contract.findOne({
            where: {
                [Op.and]: [
                    { clientId },
                    { id }
                ]
            }
        });
    }

    async getContractByContractorIdAndContractId(contractorId, id) {
        return await Contract.findOne({
            where: {
                [Op.and]: [
                    { contractorId },
                    { id }
                ]
            }
        });
    }

    async getContractByClientId(clientId) {
        return await Contract.findAll({ where: { clientId } });
    }

    async getContractByIdAndProfileId(id, profileId) {
        const contract = await this.getById(id);
        if(contract.ClientId != profileId && contract.ContractorId != profileId)
            throw new AppError(404, ERROR_MESSAGE.CONTRACT_NOT_FOUND);
       
        return contract;
    }
}

module.exports = new ContractService();
