const express = require("express")
const router = express.Router()
const { getAllUser, getOneUser, deleteUser, signIn } = require("../Handeler/userHandeler")


router.route("/user").get(getAllUser)
router.route("/user/signin").post(signIn)
router.route("/user/:id").get(getOneUser).delete(deleteUser)

module.exports = router

