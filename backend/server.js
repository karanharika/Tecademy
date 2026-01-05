const connect = require("./connect")
const express = require("express")
const cors = require("cors")
const posts = require("./postRoutes")
const users = require("./userRoutes")

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors())
// app.use(cors({
//     origin: ["https://tecademy.onrender.com"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
// }));
app.use(express.json())
app.use(posts)
app.use(users)
app.use(require("./requestRoutes"));

app.listen(PORT, () => {
    connect.conectToServer()
    console.log(`Server running onn port: ${PORT}`)
})
