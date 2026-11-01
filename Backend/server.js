const express = require("express")
const app = express()
require("dotenv").config()

const connectDb = require("./database/connectDB")
const cors = require("cors")

const PORT = process.env.PORT || 3000

connectDb()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.use("/place", require("./routes/place"))
app.use("/user", require("./routes/user"))

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})