const API_URL = 'http://localhost:3000';

async function run() {
    try {
        console.log("Starting Backend Verification...");

        // Helper for fetch
        const post = async (url, data) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || res.statusText);
            }
            return res.json();
        };

        const get = async (url) => {
            const res = await fetch(url);
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || res.statusText);
            }
            return res.json();
        };

        const put = async (url, data) => {
            const res = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || res.statusText);
            }
            return res.json();
        };

        // 1. Register Teacher
        console.log("1. Registering Teacher...");
        try {
            await post(`${API_URL}/users/register`, {
                username: "teacher1",
                password: "password123",
                email: "teacher1@example.com",
                firstName: "Teacher",
                lastName: "One",
                subjects: ["React", "Node.js"]
            });
            console.log("   Teacher registered.");
        } catch (e) {
            console.log("   Teacher might already exist:", e.message);
        }

        // Login Teacher to get ID
        const teacherLogin = await post(`${API_URL}/users/login`, {
            username: "teacher1",
            password: "password123"
        });
        const teacher = teacherLogin.user;
        console.log("   Teacher ID:", teacher._id);

        // 2. Register Student
        console.log("2. Registering Student...");
        try {
            await post(`${API_URL}/users/register`, {
                username: "student_adv",
                password: "password123",
                email: "student_adv@example.com",
                firstName: "Student",
                lastName: "Adv",
                subjects: [] // NO SUBJECT
            });
            console.log("   Student registered.");
        } catch (e) {
            console.log("   Student might already exist:", e.message);
        }

        // Login Student to get ID
        const studentLogin = await post(`${API_URL}/users/login`, {
            username: "student_adv",
            password: "password123"
        });
        const student = studentLogin.user;
        console.log("   Student ID:", student._id);

        // 3. Search Teachers
        console.log("3. Searching Teachers...");
        const teachers = await get(`${API_URL}/users/teachers`);
        const foundTeacher = teachers.find(t => t.username === "teacher1");
        if (foundTeacher) {
            console.log("   Teacher found in search:", foundTeacher.username);
        } else {
            throw new Error("Teacher not found in search!");
        }

        // 4. Send Request
        console.log("4. Sending Request...");
        const requestRes = await post(`${API_URL}/requests`, {
            student_id: student._id,
            student_name: student.username,
            teacher_id: teacher._id,
            teacher_name: teacher.username,
            subject: "React Help",
            message: "Need help with hooks"
        });
        const requestId = requestRes.request._id;
        console.log("   Request sent. ID:", requestId);

        // 5. Teacher Fetches Requests
        console.log("5. Teacher Fetching Requests...");
        const teacherRequests = await get(`${API_URL}/requests/teacher/${teacher._id}`);
        const foundRequest = teacherRequests.find(r => r._id === requestId);
        if (foundRequest) {
            console.log("   Request found in teacher's list:", foundRequest.message);
        } else {
            throw new Error("Request not found in teacher's list!");
        }

        // 6. Teacher Accepts Request
        console.log("6. Teacher Accepting Request...");
        await put(`${API_URL}/requests/${requestId}`, { status: "Accepted" });
        console.log("   Request accepted.");

        // Verify Status
        const updatedRequests = await get(`${API_URL}/requests/teacher/${teacher._id}`);
        const acceptedRequest = updatedRequests.find(r => r._id === requestId);
        if (acceptedRequest.status === "Accepted") {
            console.log("   Verification Successful: Request status is Accepted.");
        } else {
            throw new Error(`Request status is ${acceptedRequest.status}, expected Accepted.`);
        }

        console.log("ALL BACKEND TESTS PASSED!");

    } catch (error) {
        console.error("Verification Failed:", error.message);
        process.exit(1);
    }
}

run();
