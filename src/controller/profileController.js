const balanceService = require("../service/balanceService");

class ProfileController {
    async depositBalance(req, res) {
        const profile = await balanceService.depositBalance(req.body.amount, req.profile);
        res.json(profile);
    }
}

module.exports = new ProfileController();