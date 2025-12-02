const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
let postRoutes = express.Router()

// 1 - Get all
// http://localhost:3000/posts
postRoutes.route("/posts").get(async (request, response) => {
    let db = database.getDb()
    let query = {}
    if (request.query.q) {
        const searchRegex = { $regex: request.query.q, $options: "i" }
        query = {
            $or: [
                { course_name: searchRegex },
                { Branch: searchRegex },
                { instructor_fname: searchRegex },
                { instructor_lname: searchRegex }
            ]
        }
    }
    let data = await db.collection("Posts").find(query).toArray()
    if (data.length > 0) {
        response.json(data)
    } else {
        // If searching, return empty array instead of error
        if (request.query.q) {
            response.json([])
        } else {
            response.json([])
        }
    }
})

// 2 - Get one
// http://localhost:3000/posts/1234
postRoutes.route("/posts/:id").get(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("Posts").findOne({ _id: new ObjectId(request.params.id) })
    if (Object.keys(data).length > 0) {
        response.json(data)
    } else {
        throw new Error("Data not found! (1234)")
    }
})

// 3 - Create
postRoutes.route("/posts").post(async (request, response) => {
    let db = database.getDb()
    let mongoObject = {
        "Branch": request.body.Branch,
        "course_name": request.body.course_name,
        "instructor_fname": request.body.instructor_fname,
        "instructor_lname": request.body.instructor_lname,
        "instructor_username": request.body.instructor_username, // Added for host check
        "date_created": request.body.date_created,
        "session_date": request.body.session_date,
        "duration": request.body.duration, // Added duration
        "join_link": request.body.join_link
    }
    let data = await db.collection("Posts").insertOne(mongoObject)
    console.log(mongoObject)
    response.json(data)
})

// 4 - Update
postRoutes.route("/posts/:id").put(async (request, response) => {
    let db = database.getDb()
    let mongoObject = {
        $set: {
            "Branch": request.body.Branch,
            "course_name": request.body.course_name,
            "instructor_fname": request.body.instructor_fname,
            "instructor_lname": request.body.instructor_lname,
            "date_created": request.body.date_created,
            "session_date": request.body.session_date,
            "join_link": request.body.join_link
        }
    }
    let data = await db.collection("Posts").updateOne({ _id: new ObjectId(request.params.id) }, mongoObject)
    response.json(data)
})

// 5 - Delete
postRoutes.route("/posts/:id").delete(async (request, response) => {
    let db = database.getDb()
    let data = await db.collection("Posts").deleteOne({ _id: new ObjectId(request.params.id) })
    response.json(data)
})

module.exports = postRoutes