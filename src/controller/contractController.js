const contractService = require('../service/contractService');

class ContractController {

    async getContractById(req, res) {
        const { id } = req.params;
        const contract = await contractService.getContractByIdAndProfileId(id, req.profile.id);
        res.json(contract);
    }

    async getContractByProfileId(req, res) {
        const { id } = req.profile;
        const contract = await contractService.getAllContractsByProfileId(id);
        res.json(contract);
    }
}

module.exports = new ContractController();
