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
import { useColorModeValue } from "../components/ui/color-mode";
import {
  Fieldset, Field, Input, Button, Box, Stack, Heading, Text, defineStyle, HStack,
  Icon, IconButton
} from "@chakra-ui/react";
import { User, Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
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
      setTimeout( () =>  navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  }

  const boxBg = useColorModeValue("teal.400", "teal.800");
  const buttonBg = useColorModeValue("teal.100", "teal.700");
  const txtColor = useColorModeValue("black", "white");
  const HoverBg = useColorModeValue("teal.200", "teal.900");
  const hoverColor = useColorModeValue("teal.700", "teal.200");
  const highlightColor = useColorModeValue("pink.800", "pink.300");
  const altButtonBg = useColorModeValue("teal.800", "teal.100");
  const altTxtColor = useColorModeValue("white", "black");
  const altHoverBg = useColorModeValue("teal.900", "teal.200");
  const altHoverColor = useColorModeValue("teal.200", "teal.700");

  const floatingStyles = defineStyle({
    pos: "absolute",
    bg: { base: "{colors.teal.400}", _dark: "{colors.teal.800}" },
    px: "0.5",
    top: "-2",
    ml: "60px",
    insetStart: "2",
    fontWeight: "semibold",
    pointerEvents: "none",
    transition: "position",
    _peerPlaceholderShown: {
      color: "fg.muted",
      top: "3",
      ml: "60px",
      insetStart: "3",
    },
    _peerFocusVisible: {
      color: { base: "{colors.teal.700}", _dark: "{colors.teal.200}" },
      top: "-2",
      ml: "60px",
      insetStart: "2",
    },
  })

  return (

    <Box minH="100vh"               // full viewport height
      display="flex"                // flexbox container
      alignItems="center"           // vertical center
      justifyContent="center"       // horizontal center
    >

      <Box
        maxW="lg"
        w="full"
        p={6}
        borderRadius="2xl"
        boxShadow="md"
        bg={boxBg}
      >
        <Heading mb={6} textAlign="center" fontSize="3xl" color={hoverColor} >
          Sign in to Tecademy
        </Heading>

        <form onSubmit={handleLogin}>
          <Fieldset.Root size="lg" maxW="md" color={txtColor}>
            <Stack spacing={5}>

              <Fieldset.Legend mt={6} color={txtColor}>Welcome back!</Fieldset.Legend>
              <Fieldset.HelperText>
                Enter your credentials below to continue.
              </Fieldset.HelperText>

              <Fieldset.Content >
                <Field.Root>
                  <Box pos="relative" w="full" mt={5}>
                    <HStack>
                      <Box p={"11.5px"}>
                        <Icon as={User} boxSize={6} color={hoverColor} />
                      </Box>
                      <Input
                        className="peer"
                        placeholder=" "
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                        variant="outline"
                        borderColor={HoverBg}
                        _hover={{ borderColor: hoverColor }}
                        _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}
                      />
                      <Field.Label css={floatingStyles}>Username</Field.Label>
                    </HStack>
                  </Box>
                </Field.Root>

                <Field.Root>
                  <Box pos="relative" w="full" mt={2}>
                    <HStack>
                      <IconButton
                        color={hoverColor}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        size="xl"
                        variant="ghost"
                        _hover={{ bg: "teal.500" }}
                        rounded="full"
                        onClick={() => setShowPassword(!showPassword)}
                      > {showPassword ? <Eye /> : <EyeOff />}
                      </IconButton>

                      <Input
                        className="peer"
                        placeholder=""
                        type={showPassword ? "text" : "password"}
                        // type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                        variant="outline"
                        borderColor={HoverBg}
                        _hover={{ borderColor: hoverColor }}
                        _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}
                      />
                      <Field.Label css={floatingStyles}>Password</Field.Label>
                    </HStack>
                  </Box>
                </Field.Root>
              </Fieldset.Content>

              <Button
                bg={altButtonBg}
                color={altTxtColor}
                _hover={{ bg: altHoverBg, color: altHoverColor }}
                mt={7}
                mb={3}
                ml={"60px"}
                maxW="3xs"
                w="full"
                type="submit"
                alignSelf="flex-start">
                Login
              </Button>
            </Stack>
          </Fieldset.Root>
        </form>

        {message && (
          <Text mt={4} color={hoverColor} fontWeight="medium" textAlign="center">
            {message}
          </Text>
        )}
      </Box>
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
