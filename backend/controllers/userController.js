const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const {User, Doctor, Patient} = require("../models")


class userController{
    static async register(req,res){
        try{

            const payloadUser = {
                username: req.body.username,
                password: req.body.password,
                roleId: req.body.role
            }
            let response = null

            if(req.body.role == 1){ 

                const addUser = await User.create(payloadUser)
                response = res.status(201).json(addUser)

            }else if (req.body.role == 2){
                
                await User.create(payloadUser)

                const user = await User.findOne({
                    order: [['id', 'DESC']]
                });

                const payloadDoctor = {
                    name: req.body.name,
                    birthDate: req.body.birthDate,
                    birthPlace: req.body.birthPlace,
                    scheduleId: req.body.scheduleId,
                    userId: user.id
                }

                const addDoctor = await Doctor.create(payloadDoctor)

                response = res.status(201).json(addDoctor)

            }else if (req.body.role == 3) {

                await User.create(payloadUser)

                const user = await User.findOne({
                    order: [['id', 'DESC']]
                });

                console.log(user.id)

                const payloadPatient = {
                    name: req.body.name,
                    birthDate: req.body.birthDate,
                    birthPlace: req.body.birthPlace,
                    userId: user.id
                }

                const addPatient = await Patient.create(payloadPatient)

                response = res.status(201).json(addPatient)
            }

            return response

        }catch(error){

            return res.status(500).json({
                message: error
            })

        }
    }
    static async login(req,res){
        try{
            const payload = {
                username: req.body.username,
                password: req.body.password
            }

            const result = await User.findOne({
                where:{
                    username : payload.username
                }
            }) 

            if(!result){
                return res.status(401).json({
                    message: "Invalid username/password"
                })
            }

            const match = comparePassword(payload.password, result.password)

            if(match){
                const opt = {
                    id: result.id,
                    username: result.username,
                    role: result.roleId
                }
                const access_token = generateToken(opt)

                return res.status(201).json({
                    access_token
                })

            }else{
                return res.status(401).json({
                    message: "Invalid username/password"
                })
            }
        }catch(error){
            return res.status(500).json({
                message: error
            })
        }
    }
    static async getById(req, res){
        try {
            const id = +req.params.id
            const response = await User.findOne({
                where:{
                    id
                }
            })
            return res.status(200).json({username: response.username})
        } catch (error) {
            return res.status(500).json(response)
        }
    }
    static async update(req, res){
        try {
            const id = +req.params.id
            let payload = {
                username: req.body.username,
                password: req.body.password
            }
            const response = await User.update(payload,{
                where:{
                    id
                },
                individualHooks: true
            })
            return res.status(201).json({
                response,
                message : "Update Success !!!"
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = userController