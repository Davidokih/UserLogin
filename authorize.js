const jwt = require("jsonwebtoken")

const verification = (req, res, next) => {
    try {
        const checkAuth = req.headers.authorization
        if (checkAuth) {
            const token = checkAuth.split(" ")[1]
            if (token) {
                jwt.verify(token, "AJMarketPlace", (err, payLoad) => {
                    if (err) {
                        res.status(500).json({
                            message: err.message
                        })
                    } else {
                        req.user = payLoad
                        next()
                    }
                })
            } else {
                res.status(500).json({
                    message: "Check your token"
                })
            }
        } else {

        }
    } catch (error) {

    }
}

module.exports = verification