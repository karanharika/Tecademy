import { useState } from "react";
import { Box, Heading, } from "@chakra-ui/react";
// import { Auth } from "aws-amplify";
import * as Auth from "aws-amplify/auth";
import { useAuthContext } from "./AuthProvider";

// import { useAuth } from "./authContext";


export default function LoginForm() {
    const { checkUser } = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //test part
    // const { login, user } = useAuth();
    // const handleFakeLogin = () => {
    //     login({
    //         username: "kv.admin",
    //         email: "harika.karanveer@gmail.com",
    //         given_name: "Karan",
    //         family_name: "Harika",
    //     });

    //     setTimeout(function() {
    //         window.location.href = 'http://localhost:5173/#/dashboard'; // Or 'window.location.replace()' for no back button history
    //       }, 2000);
    // };
    //end test part

    async function handleLogin(e) {
        e.preventDefault();
        try {
            await Auth.signIn(email, password);
            await checkUser(); // refresh context
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <Box mt={16}>
            <Heading> Login Page</Heading>

            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full"
                />
                <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">
                    Login
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>

            {/* <Heading>TEST</Heading>
            {!user && (
                <button onClick={handleFakeLogin}>
                    Simulate Login
                </button>
            )}
            {user && <p>Welcome, {user.given_name}!</p>} */}

        </Box>

    );
}
