const connect = require("./connect")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const posts = require("./postRoutes")
const users = require("./userRoutes")

const app = express()
const PORT = 3000

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow both ports
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(posts);
app.use(users);
app.use(require("./requestRoutes"));

app.listen(PORT, () => {
    connect.conectToServer()
    console.log(`Server running onn port: ${PORT}`)
})
