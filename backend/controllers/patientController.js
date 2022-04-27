const {Patient, User} = require("../models")

class patientController{
    static async get(req, res){
        try {
            const response = await Patient.findAll()
            return res.status(200).json(response)

        } catch (error) {
            return res.status(500).json(response)
        }
    }
    static async getById(req, res){
        try {
            const id = +req.params.id
            const response = await Patient.findOne({
                where:{
                    id
                }
            })
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    static async getByUser(req, res){
        try {
            const id = +req.params.id
            const response = await Patient.findOne({
                where:{
                    userId: id
                }
            })
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    static async update(req, res){
        try {                
            
                const patientId = await Patient.findOne({
                    where:{
                        userId: +req.params.id
                    }
                })

                const payloadPatient = {
                    name: req.body.name,
                    birthDate: req.body.birthDate,
                    birthPlace: req.body.birthPlace
                }
                const patient = await Patient.update(payloadPatient,{
                    where:{
                        id: patientId.id
                    }
                })


            return res.status(201).json({
                patient,
                message : "Update Success !!!"
            })
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    static async delete(req, res){
        try {
            const id = +req.params.id
            
            const response = await Patient.destroy({
                where:{
                    id
                }
            })
            return res.status(200).json({
                response,
                message : "Delete Success"
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = patientController