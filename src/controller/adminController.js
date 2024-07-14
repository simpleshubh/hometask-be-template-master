const adminService = require("../service/adminService");

class AdminController {

    async getBestProfession(req, res) {
        const startDate = req.query.startDate || null;
        const endDate = req.query.endDate || null;
        res.json(await adminService.getBestProfession(startDate, endDate));
    }

    async getBestClient(req, res) {
        const startDate = req.query.startDate || null;
        const endDate = req.query.endDate || null;
        const limit = req.query.limit || 2;
        res.json(await adminService.getBestClient(startDate, endDate, limit));
    }
}

module.exports = new AdminController();