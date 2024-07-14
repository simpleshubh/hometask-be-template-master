const { Contract, Job, Profile, sequelize } = require("../model");
const { Op } = require('sequelize');

class AdminService {
    async getBestProfession(startDate, endDate) {
        const results = await Job.findOne({
            where: this.prepareWhereClause(startDate, endDate),
            include: [
                {
                    model: Contract,
                    attributes: [],
                    include: [
                        {
                            model: Profile,
                            as: 'Contractor',
                            attributes: ['profession'],
                        },
                    ],
                },
            ],
            attributes: [
                [sequelize.col('Contract.Contractor.profession'), 'profession'],
                [sequelize.fn('SUM', sequelize.col('price')), 'totalEarnings'],
            ],
            group: ['Contract.Contractor.profession'],
            order: [[sequelize.fn('SUM', sequelize.col('price')), 'DESC']],
        });

        return results;
    }

    async getBestClient(startDate, endDate, limit) {
        const results = await Job.findAll({
            where: this.prepareWhereClause(startDate, endDate),
            include: [
                {
                    model: Contract,
                    attributes: [],
                    include: [
                        {
                            model: Profile,
                            as: 'Client',
                            attributes: ['firstName', 'lastName'],
                        },
                    ],
                },
            ],
            attributes: [
                [sequelize.col('Contract.ClientId'), 'ClientId'],
                [sequelize.col('Contract.Client.firstName'), 'firstName'],
                [sequelize.col('Contract.Client.lastName'), 'lastName'],
                [sequelize.fn('SUM', sequelize.col('price')), 'totalEarnings'],
            ],
            group: ['Contract.ClientId'],
            order: [[sequelize.fn('SUM', sequelize.col('price')), 'DESC']],
            limit: limit
        });

        return results;
    }

    prepareWhereClause(startDate, endDate) {
        let whereClause = {
            paid: true
        };

        return {
            ...whereClause,
            ...(startDate && endDate && { paymentDate: { [Op.between]: [startDate, endDate] } }),
            ...(startDate && !endDate && { paymentDate: { [Op.gte]: startDate } }),
            ...(!startDate && endDate && { paymentDate: { [Op.lte]: endDate } }),
        };
    }
}

module.exports = new AdminService();