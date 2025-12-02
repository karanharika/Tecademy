const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "./config.env" });

async function registerStudent() {
    const uri = process.env.ATLAS_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("Tecademy");
        const users = db.collection("Users");

        const username = "student1";
        const password = "password123";
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if exists
        const existing = await users.findOne({ username });
        if (existing) {
            console.log("User student1 already exists. Resetting tokens.");
            await users.updateOne({ username }, { $set: { tokens: 10 } });
            return;
        }

        const newUser = {
            username,
            password: hashedPassword,
            email: "student1@example.com",
            FirstName: "Student",
            LastName: "One",
            tokens: 10,
            createdAt: new Date()
        };

        await users.insertOne(newUser);
        console.log("Registered student1 with 10 tokens.");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

registerStudent();
