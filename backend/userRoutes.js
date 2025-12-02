const express = require("express")
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

let userRoutes = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_in_prod"

// 1 - Register
userRoutes.route("/register").post(async (request, response) => {
    let db = database.getDb()
    const { username, password, email, firstName, lastName, birthdate } = request.body

    // Check if user exists
    const existingUser = await db.collection("Users").findOne({ username })
    if (existingUser) {
        return response.status(400).json({ message: "Username already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    let mongoObject = {
        username,
        password: hashedPassword,
        email,
        FirstName: firstName,
        LastName: lastName,
        DOB: birthdate,
        createdAt: new Date(),
        tokens: 10, // Initialize with 10 tokens
        subjects: request.body.subjects || [] // Store subjects
    }

    let data = await db.collection("Users").insertOne(mongoObject)
    response.json(data)
})

// 2 - Login
userRoutes.route("/login").post(async (request, response) => {
    let db = database.getDb()
    const { username, password } = request.body

    const user = await db.collection("Users").findOne({ username })
    if (!user) {
        console.log("Login failed: User not found", username)
        return response.status(401).json({ message: "Invalid credentials" })
    }
    console.log("Login: User found", user.username)
    // console.log("Login: Stored hash", user.password)

    const isPasswordValid = await bcrypt.compare(password, user.password)
    // console.log("Login: Password valid?", isPasswordValid)

    if (!isPasswordValid) {
        return response.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: "24h" }
    )

    response.cookie("auth_token", token, {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })

    response.json({
        message: "Login successful",
        user: {
            username: user.username,
            email: user.email,
            FirstName: user.FirstName,
            LastName: user.LastName,
            tokens: user.tokens || 0 // Return tokens
        }
    })
})

// 3 - Logout
userRoutes.route("/logout").post((request, response) => {
    response.clearCookie("auth_token")
    response.json({ message: "Logout successful" })
})

// 4 - Get Current User (Me)
userRoutes.route("/me").get(async (request, response) => {
    const token = request.cookies.auth_token
    if (!token) {
        return response.status(401).json({ message: "Not authenticated" })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        let db = database.getDb()
        const user = await db.collection("Users").findOne({ _id: new ObjectId(decoded.userId) })

        if (!user) {
            return response.status(401).json({ message: "User not found" })
        }

        response.json({
            username: user.username,
            email: user.email,
            FirstName: user.FirstName,
            LastName: user.LastName,
            tokens: user.tokens || 0 // Return tokens
        })
    } catch (error) {
        return response.status(401).json({ message: "Invalid token" })
    }
})

// 5 - Deduct Token
userRoutes.route("/users/deduct-token").post(async (request, response) => {
    const token = request.cookies.auth_token
    if (!token) {
        return response.status(401).json({ message: "Not authenticated" })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        let db = database.getDb()
        const userId = new ObjectId(decoded.userId)

        const user = await db.collection("Users").findOne({ _id: userId })
        if (!user) {
            return response.status(404).json({ message: "User not found" })
        }

        if ((user.tokens || 0) < 1) {
            return response.status(400).json({ message: "Insufficient tokens" })
        }

        await db.collection("Users").updateOne(
            { _id: userId },
            { $inc: { tokens: -1 } }
        )

        const updatedUser = await db.collection("Users").findOne({ _id: userId })

        response.json({
            success: true,
            tokens: updatedUser.tokens,
            message: "Token deducted successfully"
        })

    } catch (error) {
        console.error("Token deduction error:", error)
        return response.status(500).json({ message: "Server error" })
    }
})

// Get all teachers (users with subjects)
userRoutes.route("/users/teachers").get(async (req, response) => {
    let db_connect = database.getDb();
    // Find users where subjects array exists and is not empty
    let query = { subjects: { $exists: true, $ne: [] } };
    let data = await db_connect.collection("Users").find(query).toArray();
    // Return only public info
    const teachers = data.map(user => ({
        _id: user._id,
        username: user.username,
        FirstName: user.FirstName,
        LastName: user.LastName,
        subjects: user.subjects
    }));
    response.json(teachers);
});

module.exports = userRoutes