const jobService = require('../service/jobService');


class JobController {

    async getUnpaidJobs(req, res) {
        const { id } = req.profile;
        const jobs = await jobService.getUnpaidJobs(id);
        if (!jobs) return res.status(404).end();
        res.json(jobs);
    }

    async payForJob(req, res) {
        const jobs = await jobService.payForJob(req.params.id, req.profile);
        if (!jobs) return res.status(404).end();
        res.json(jobs);
    }
}

module.exports = new JobController();