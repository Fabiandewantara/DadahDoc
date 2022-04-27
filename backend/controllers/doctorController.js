const {Doctor, User} = require("../models")

class doctorController{
    static async get(req, res){
        try {
            const response = await Doctor.findAll()
            return res.status(200).json(response)

        } catch (error) {
            return res.status(500).json(response)
        }
    }
    static async getById(req, res){
        try {
            const id = +req.params.id
            const response = await Doctor.findOne({
                where:{
                    id
                }
            })
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(response)
        }
    }
    static async getByUser(req, res){
        try {
            const id = +req.params.id
            const response = await Doctor.findOne({
                where:{
                    userId: id
                }
            })
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json(response)
        }
    }
    static async update(req, res){
        try {
            const id = +req.params.id
            let response = null
            if(req.params.user){

                const payloadUser = {
                    username: req.body.username,
                    password: req.body.password
                }

                const patient = await Doctor.findOne({
                    where:{
                        id
                    }
                }) 

                const user = await User.update(payloadUser,{
                    where:{
                        id: patient.userId
                    },
                    individualHooks: true
                })
                response = res.status(201).json({
                    user: user[0],
                    message : "Update Success !!!"
                })

            }else{
                const doctorId = await Doctor.findOne({
                    where:{
                        userId: req.params.id
                    }
                })
                const payloadDoctor = {
                    name: req.body.name,
                    birthDate: req.body.birthDate,
                    birthPlace: req.body.birthPlace
                }
                const doctor = await Doctor.update(payloadDoctor,{
                    where:{
                        id: doctorId.id
                    }
                })

                response = res.status(201).json({
                    doctor,
                    message : "Update Success !!!"
                })

            }

            return response
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    static async delete(req, res){
        try {
            const id = +req.params.id
            
            const doctor = await Doctor.findOne({
                where:{
                    id
                }
            })

            await User.destroy({
                where:{
                    id: doctor.userId
                }
            })

            const response = await Doctor.destroy({
                where:{
                    id
                }
            })
            return res.status(200).json({
                response,
                message : "Delete Success!!!"
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = doctorController