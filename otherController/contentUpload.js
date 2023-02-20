const express = require("express")
const router = express.Router()
const cloudinary = require("../utils/cloudinary")
const contentModel = require("../model/contentModel")
const verification = require("../authorize")

router.get("/", async (res, req) => {
    try {
        const getContent = await contentModel.find()
        res.status(500).json({
            message: "success",
            data: getContent
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
router.get("/:id", async (res, req) => {
    try {
        const getContent = await contentModel.findById(req.params.id)
        res.status(500).json({
            message: "success",
            data: getContent
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})
router.delete("/:id", verification, async (res, req) => {

    if (req.user.seller === true) {

        try {
            const getContent = await contentModel.findByIdAndDelete()
            res.status(201).json({
                message: "deleted",
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    } else {
        res.status(200).json({
            message: "you cannot  carry out this Operation",
        })
    }
})
router.post("/", verification, image, async (res, req) => {
    if (req.user.seller === true) {
        try {
            const { description, title, price, category } = req.body

            const myImage = await cloudinary.uploader.upload(req.file.path)

            const getContent = await contentModel.create({
                description,
                title,
                price,
                category
            })
            res.status(500).json({
                message: "success",
                data: getContent
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    } else {
        res.status(200).json({
            message: "you cannot  carry out this Operation"
        })
    }
})
router.patch("/:id", verification, image, async (res, req) => {
    if (req.user.seller === true) {
        try {
            const getContent = await contentModel.findByIdAndUpdate()
            res.status(500).json({
                message: "success",
                data: getContent
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    } else {
        res.status(200).json({
            message: "you cannot  carry out this Operation"
        })
    }
})

module.exports = router