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

// Get all teachers (users with subjects)
userRoutes.route("/user/teachers").get(async (req, response) => {
    let db_connect = database.getDb();
    // Find users where subjects array exists and is not empty
    let query = { subjects: { $exists: true, $type: "array", $ne: [] } };
    let data = await db_connect.collection("Users").find(query).toArray();
    // Return only public info
    const teachers = data.map(user => ({
        _id: user._id,
        FirstName: user.FirstName,
        LastName: user.LastName,
        subjects: Array.isArray(user.subjects) ? user.subjects : []
    }));
    response.json(teachers);
});


// 2 - Get one
// http://localhost:3000/users/1234
userRoutes.route("/users/:username").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("Users").findOne({ username: request.params.username })
    if (data) {
        response.json(data)
    } else {
        response.status(404).json({ message: "User not found" })
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
        "username": request.body.username,
        "tokens": 100
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