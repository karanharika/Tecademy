import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://jasjot:SUK0907%23tiet@cluster0.1p2p5.mongodb.net/Tecademy?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db("Tecademy");
        const users = database.collection("users");
        const requests = database.collection("requests");
        const posts = database.collection("posts");

        const result1 = await users.deleteMany({ username: { $in: ["teacher1", "student_adv"] } });
        console.log(`Deleted ${result1.deletedCount} users.`);

        const result2 = await requests.deleteMany({ $or: [{ teacher_name: "teacher1" }, { student_name: "student_adv" }] });
        console.log(`Deleted ${result2.deletedCount} requests.`);

        const result3 = await posts.deleteMany({ instructor_username: "teacher1" });
        console.log(`Deleted ${result3.deletedCount} posts.`);

    } finally {
        await client.close();
    }
}
run().catch(console.dir);
