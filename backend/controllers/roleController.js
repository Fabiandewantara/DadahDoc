const {Role} = require("../models")

class roleController{
    static async get(req, res){
        try {
            const response = await Role.findAll()
            return res.status(200).json(response)

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = roleController