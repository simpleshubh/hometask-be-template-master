const { Job, sequelize } = require("../model");
const BaseService = require('./baseService');
const profileService = require('./profileService');
const AppError = require('../exception/appError');
const contractService = require("./contractService");
const { Op } = require('sequelize');
const ERROR_MESSAGE = require("../constant/error");



class JobService extends BaseService {

    constructor() {
        super(Job);
    }

    async getUnpaidJobs(profileId) {
        const contracts = await contractService.getContractByClientId(profileId);
        const contractIds = contracts.map(contract => contract.id);
        return await Job.findAll({
            where: {
                contractId: {
                    [Op.in]: contractIds
                },
                paid: null
            }
        });
    }

    async payForJob(id, profile) {
        const job = await this.getById(id);
        if (job.paid)
            throw new AppError(400, ERROR_MESSAGE.ALREADY_PAID);

        const contract = await contractService.getContractByClientIdAndContractId(profile.id, job.ContractId);

        if (!contract)
            throw new AppError(400, ERROR_MESSAGE.ITEM_NOT_FOUND);

        const contractor = await profileService.getById(contract.ContractorId);

        if (job.price > profile.balance)
            throw new AppError(400, ERROR_MESSAGE.INSUFFICIENT_BALANCE);

        const t = await sequelize.transaction();

        try {
            job.paid = 'true';
            job.paymentDate = new Date();
            await job.save({ transaction: t });
            profile.balance -= job.price;
            contractor.balance += job.price;
            await profile.save({ transaction: t });
            await contractor.save({ transaction: t });
            await t.commit();
            return job;
        } catch (error) {
            await t.rollback();
            throw new AppError(500, ERROR_MESSAGE.SOMETHING_WENT_WRONG);
        }

    }
}

module.exports = new JobService();