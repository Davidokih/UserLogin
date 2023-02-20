const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAllUser = async (req, res) => {
    try {
        const user = await userModel.find()
        res.status(200).json({
            message: 200,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: error.message,
        })
    }
}
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const findUser = await userModel.findOne(email)

        if (findUser) {
            const passCheck = await bcrypt.compare(password, findUser.password)

            if (passCheck) {
                const token = jwt.sign({
                    _id: findUser._id,
                    email: findUser.email,
                    userName: findUser.userName,
                    seller: findUser.seller,
                    avatar: findUser.avatar
                },
                    "AJMarketPlace",
                    { expiresIn: "1d" }
                )
                const { password, ...info } = findUser._id

                res.status(201).json({
                    status: `Welcome back ${findUser.userName}`,
                    data: { token, ...info }
                })
            } else {
                res.status(500).json({
                    status: "password is incorrect"
                })
            }
        } else {
            res.status(500).json({
                status: error.message,
            })
        }
        res.status(200).json({
            message: 200,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: error.message,
        })
    }
}
const getOneUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        res.status(200).json({
            message: 200,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: error.message,
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 200,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            status: error.message,
        })
    }
}


module.exports = {
    getAllUser,
    signIn,
    getOneUser,
    deleteUser
}