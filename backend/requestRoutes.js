const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

let requestRoutes = express.Router();

// Create a new request
requestRoutes.route("/requests").post(async (req, response) => {
    let db_connect = database.getDb();
    let myobj = {
        student_id: req.body.student_id,
        student_name: req.body.student_name,
        teacher_id: req.body.teacher_id,
        teacher_name: req.body.teacher_name,
        subject: req.body.subject,
        message: req.body.message,
        status: "Pending", // Pending, Accepted, Rejected
        createdAt: new Date(),
    };
    let data = await db_connect.collection("Requests").insertOne(myobj);
    response.json(data);
});

// Get requests for a teacher
requestRoutes.route("/requests/teacher/:teacherId").get(async (req, response) => {
    let db_connect = database.getDb();
    let query = { teacher_id: req.params.teacherId };
    let data = await db_connect.collection("Requests").find(query).toArray();
    response.json(data);
});

// Get requests by a student
requestRoutes.route("/requests/student/:studentId").get(async (req, response) => {
    let db_connect = database.getDb();
    let query = { student_id: req.params.studentId };
    let data = await db_connect.collection("Requests").find(query).toArray();
    response.json(data);
});

// Update request status
requestRoutes.route("/requests/:id").put(async (req, response) => {
    let db_connect = database.getDb();
    let query = { _id: new ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            status: req.body.status,
        },
    };
    let data = await db_connect.collection("Requests").updateOne(query, newvalues);
    response.json(data);
});

module.exports = requestRoutes;
