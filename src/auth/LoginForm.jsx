// //LoginForm.jsx
// import { useState } from "react";
// import { Box, Heading, } from "@chakra-ui/react";
// // import { Auth } from "aws-amplify";
// import * as Auth from "aws-amplify/auth";
// import { useAuthContext } from "./AuthProvider";

// // import { useAuth } from "./authContext";


// export default function LoginForm() {
//     const { checkUser } = useAuthContext();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");



//     async function handleLogin(e) {
//         e.preventDefault();
//         try {
//             await Auth.signIn(email, password);
//             await checkUser(); // refresh context
//         } catch (err) {
//             setError(err.message);
//         }
//     }

//     return (
//         <Box mt={16}>
//             <Heading> Login Page</Heading>

//             <form onSubmit={handleLogin} className="space-y-4">
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="border p-2 w-full"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="border p-2 w-full"
//                 />
//                 <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">
//                     Login
//                 </button>
//                 {error && <p className="text-red-500">{error}</p>}
//             </form>



//         </Box>

//     );
// }

// ********************************************************************************************************************************
// LoginForm.jsx
import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import { useAuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

import {
  Fieldset,
  Field,
  Input,
  Button,
  Box,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";

export default function LoginForm() {
  const { checkUser } = useAuthContext();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
    //   const user = await signIn({
    //     username: formData.username,
    //     password: formData.password,
    //   });

    //   // refresh auth context → updates navbar
    //   await checkUser();
    await login(formData.username, formData.password);

      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  }

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={"100px"}
      p={6}
      borderWidth="1px"
      borderRadius="2xl"
      boxShadow="md"
      bg="teal.800"
    >
      <Heading mb={6} textAlign="center" color="white">
        Login to Your Account
      </Heading>

      <form onSubmit={handleLogin}>
        <Fieldset.Root size="lg" maxW="md">
          <Stack spacing={5}>
            <Fieldset.Legend>Welcome back</Fieldset.Legend>
            <Fieldset.HelperText>
              Enter your credentials to continue.
            </Fieldset.HelperText>

            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Username</Field.Label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
              </Field.Root>
            </Fieldset.Content>

            <Button type="submit" colorScheme="teal" alignSelf="flex-start">
              Login
            </Button>
          </Stack>
        </Fieldset.Root>
      </form>

      {message && (
        <Text mt={4} color="teal.200" fontWeight="medium" textAlign="center">
          {message}
        </Text>
      )}
    </Box>
  );
}
// ******************************************************************************************************************

// // src/auth/LoginForm.jsx
// import React, { useState } from "react";
// import { useAuthContext } from "./AuthProvider";
// import { useNavigate } from "react-router-dom";

// import {
//   Fieldset,
//   Field,
//   Input,
//   Button,
//   Box,
//   Stack,
//   Heading,
//   Text,
// } from "@chakra-ui/react";

// export default function LoginForm() {
//   const { login } = useAuthContext();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   function handleChange(e) {
//     setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
//   }

//   async function handleLogin(e) {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     try {
//       const result = await login(formData.username.trim(), formData.password);

//       // If login returned nextStep (MFA / new password) handle it here.
//       if (result?.nextStep) {
//         // example: show a message or route to a step-specific page
//         setMessage("⚠️ Additional sign-in step required: " + JSON.stringify(result.nextStep));
//         setLoading(false);
//         return;
//       }

//       // success — wait a tiny moment so provider can update state (usually immediate)
//       setMessage("✅ Login successful — redirecting...");
//       // Navigate to dashboard and replace history so back doesn't show login
//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       // Amplify errors sometimes come as objects
//       const text = err?.message || err?.toString() || "Login failed";
//       setMessage("❌ " + text);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Box
//       maxW="lg"
//       mx="auto"
//       mt={"100px"}
//       p={6}
//       borderWidth="1px"
//       borderRadius="2xl"
//       boxShadow="md"
//       bg="teal.800"
//     >
//       <Heading mb={6} textAlign="center" color="white">
//         Login to Your Account
//       </Heading>

//       <form onSubmit={handleLogin}>
//         <Fieldset.Root size="lg" maxW="md">
//           <Stack spacing={5}>
//             <Fieldset.Legend>Welcome back</Fieldset.Legend>
//             <Fieldset.HelperText>Enter your credentials to continue.</Fieldset.HelperText>

//             <Fieldset.Content>
//               <Field.Root>
//                 <Field.Label>Username</Field.Label>
//                 <Input
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                   autoComplete="username"
//                 />
//               </Field.Root>

//               <Field.Root>
//                 <Field.Label>Password</Field.Label>
//                 <Input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   autoComplete="current-password"
//                 />
//               </Field.Root>
//             </Fieldset.Content>

//             <Button type="submit" colorScheme="teal" alignSelf="flex-start" isLoading={loading}>
//               Login
//             </Button>
//           </Stack>
//         </Fieldset.Root>
//       </form>

//       {message && (
//         <Text mt={4} color="teal.200" fontWeight="medium" textAlign="center">
//           {message}
//         </Text>
//       )}
//     </Box>
//   );
// }
