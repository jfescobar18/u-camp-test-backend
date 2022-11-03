const compression = require("compression")
const bodyParser = require("body-parser")
const express = require("express")
const cors = require("cors")
const path = require("path")
const apicache = require("apicache")
const { ConsoleSuccess, ConsoleError } = require("./src/Utils/ConsoleConfig")

const app = express()
const cache = apicache.middleware

const shouldCompress = (req, res) => {
    if (req.headers["x-no-compression"]) {
        return false
    }
    return compression.filter(req, res)
}

app.use(cors())
app.options("*", cors())
app.use(bodyParser.json())
app.use(
    compression({
        filter: shouldCompress,
        level: 7,
    })
)

app.use(bodyParser.json({ limit: "5mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname + "/wwwroot")))
app.use(cache("20 minutes"))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "wwwroot", "index.html"))
})

const AuthenticationRoutes = require("./src/Routes/SearchRoutes")()
app.use("/api/search", AuthenticationRoutes)

function printServerInfo() {
    var dateTime = new Date()
    var message = `🚀 Server runnning on Port: ${
        process.env.PORT
    } Started at : ${dateTime.toISOString()}`
    console.log(ConsoleSuccess, message)
}

function createServer() {
    app.listen(process.env.PORT, () => printServerInfo())
}

try {
    createServer()
} catch (error) {
    console.log(ConsoleError, error)
}
