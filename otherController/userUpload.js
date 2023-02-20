const express = require("express")
const router = express.Router()
const cloudinary = require("../utils/cloudinary")
const upload = require("../utils/multer")
const bcrypt = require("bcrypt")
const userModel = require("../model/userModel")

router.post("/register", upload, async (req, res) => {
    try {
        const { email, password, userName } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const image = await cloudinary.uploader.upload(req.file.path)

        const createUser = await userModel.create({
            email,
            password: hashed,
            userName,
            avatar: image.secure_url,
            avatarID: image.public_id,
            seller: false
        })

        res.status(201).json({
            message: "user created",
            data: createUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
router.post("/register_join", upload, async (req, res) => {
    try {
        const { email, password, userName } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const image = await cloudinary.uploader.upload(req.file.path)

        const createUser = await userModel.create({
            email,
            password: hashed,
            userName,
            avatar: image.secure_url,
            avatarID: image.public_id,
            seller: true
        })

        res.status(201).json({
            message: "user created",
            data: createUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
router.post("/:id/update", upload, async (req, res) => {
    try {
        const { userName } = req.body

        const image = await cloudinary.uploader.upload(req.file.path)

        const createUser = await userModel.findByIdAndUpdate(req.params.body, {
            userName,
            avatar: image.secure_url,
            avatarID: image.public_id,
        }, { new: true })

        res.status(201).json({
            message: "user created",
            data: createUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})


module.exports = router