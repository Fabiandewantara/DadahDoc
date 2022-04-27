const {Schedule} = require("../models")

class scheduleController{
    static async get(req, res){
        try {
            const response = await Schedule.findAll()
            return res.status(200).json(response)

        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = scheduleController