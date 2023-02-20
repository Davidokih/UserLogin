const mongoose = require("mongoose")
const url = "mongodb://localhost/marketPlace"

mongoose.connect(url).then(() => {
    console.log("connected to DataBase")
}).catch((error) => {
    console.log(error)
})