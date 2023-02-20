require("./utils/db")
const express = require("express")
const cors = require("cors")
const port = 4444
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", require("./router/userRouter"))
app.use("/api", require("./otherController/userUpload"))
app.use("/api", require("./otherController/userUpload"))


app.listen(port, () => {
    console.log(`Runing on ${port}`)
})


