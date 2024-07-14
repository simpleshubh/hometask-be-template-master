const ERROR_MESSAGE = require("../constant/error");
const AppError = require("../exception/appError");
const { Profile } = require("../model");
const BaseService = require('./baseService');
const jobService = require("./jobService");

class BalanceService extends BaseService {
    constructor() {
        super(Profile);
    }

    async depositBalance(amount, profile) {
        const payableAmount = await this.getPayableAmount(profile);
        if (amount > (payableAmount / 4))
            throw new AppError(400, ERROR_MESSAGE.DEPOSIT_AMOUNT_MAX_LIMIT_EXCEEDED);
        const user = await this.getById(profile.id);
        user.balance += amount;
        return this.update(user.id, { balance: user.balance });
    }

    async getPayableAmount(profile) {
        const jobs = await jobService.getUnpaidJobs(profile.id);
        return jobs.map(job => job.price).reduce((acc, price) => acc + price, 0);
    }
}

module.exports = new BalanceService();