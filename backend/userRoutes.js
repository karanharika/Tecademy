const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
let userRoutes = express.Router()

// 1 - Get all
// http://localhost:3000/users
userRoutes.route("/users").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("Users").find({}).toArray()
    if (data.length > 0) {
        response.json(data)
    } else {
        throw new Error("Data not found!")
    }
})

// 2 - Get one
// http://localhost:3000/users/1234
userRoutes.route("/users/:username").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("Users").findOne({ username: request.params.username })
    if (Object.keys(data).length > 0) {
        response.json(data)
    } else {
        throw new Error("Data not found! (1234)")
    }
})

// 3 - Create
userRoutes.route("/users").post(async (request, response) => {
    let db = database.getDb()
    let mongoObject = {
        "FirstName": request.body.FirstName,
        "LastName": request.body.LastName,
        "DOB": request.body.DOB,
        "email": request.body.email,
        "username": request.body.username
    }
    let data = await db.collection("Users").insertOne(mongoObject)
    response.json(data)
})

// 4 - Update
userRoutes.route("/users/:username").put(async (request, response) => {
    let db = database.getDb()
    let mongoObject = {
        $set: {
            "FirstName": request.body.FirstName,
            "LastName": request.body.LastName,
            "DOB": request.body.DOB,
            "email": request.body.email,
            "username": request.body.username
        }
    }
    let data = await db.collection("Users").updateOne({ username: request.params.username }, mongoObject)
    response.json(data)
})

// 5 - Delete
userRoutes.route("/users/:username").delete(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("Users").deleteOne({ username: request.params.username })
    response.json(data)
})

module.exports = userRoutes