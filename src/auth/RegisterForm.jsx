// import { useState } from "react";
// import * as Auth from "aws-amplify/auth";
// import { Box, Heading, } from "@chakra-ui/react";


// export default function RegisterForm() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [message, setMessage] = useState("");

//     async function handleRegister(e) {
//         e.preventDefault();
//         try {
//             await Auth.signUp({
//                 username: email,
//                 password,
//                 attributes: { email },
//             });
//             setMessage("Registration successful! Please check your email to confirm.");
//         } catch (err) {
//             setMessage(err.message);
//         }
//     }

//     return (

//         <Box mt={16}>
//             <Heading>Register and SignUp </Heading>
//             <form onSubmit={handleRegister} className="space-y-4">
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
//                     Register
//                 </button>
//                 {message && <p>{message}</p>}
//             </form>

//         </Box>


//     );
// }



// src/components/RegisterForm.jsx
// import { useState } from "react";
// import * as Auth from "aws-amplify/auth";
// import {
//   Box,
//   Heading,
//   Button,
//   Input,
//   Text,
//   VStack,
//   Fieldset,
//   Field,
//   useToast,
// } from "@chakra-ui/react";

// export default function RegisterForm() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     firstName: "",
//     familyName: "",
//     lastName: "",
//     dob: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const toast = useToast();

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   }

//   async function handleRegister(e) {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       toast({
//         title: "Passwords do not match",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }

//     try {
//       setLoading(true);
//       await Auth.signUp({
//         username: formData.username,
//         password: formData.password,
//         attributes: {
//           email: formData.email,
//           given_name: formData.firstName,
//           family_name: formData.familyName,
//           middle_name: formData.lastName, // optional mapping
//           birthdate: formData.dob,
//         },
//       });

//       toast({
//         title: "Registration successful!",
//         description: "Please check your email to confirm your account.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//       setFormData({
//         username: "",
//         email: "",
//         firstName: "",
//         familyName: "",
//         lastName: "",
//         dob: "",
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       toast({
//         title: "Error registering",
//         description: err.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Box
//       m={{ base: 4, md: 8 }}
//       p={{ base: 6, md: 10 }}
//       borderWidth="1px"
//       borderRadius="2xl"
//       shadow="xl"
//       maxW="lg"
//       mx="auto"
//       bg="white"
//     >
//       <Heading mb={8} color="teal.600" size="lg" textAlign="center">
//         Create Your Account
//       </Heading>

//       <form onSubmit={handleRegister}>
//         <Fieldset.Root size="lg">
//           <VStack spacing={4} align="stretch">
//             <Field label="Username">
//               <Input
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 placeholder="Choose a username"
//                 isRequired
//               />
//             </Field>

//             <Field label="Email">
//               <Input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 isRequired
//               />
//             </Field>

//             <Field label="First Name / Given Name">
//               <Input
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 placeholder="Enter first name"
//                 isRequired
//               />
//             </Field>

//             <Field label="Family Name">
//               <Input
//                 name="familyName"
//                 value={formData.familyName}
//                 onChange={handleChange}
//                 placeholder="Enter family name"
//               />
//             </Field>

//             <Field label="Last Name">
//               <Input
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 placeholder="Enter last name"
//               />
//             </Field>

//             <Field label="Date of Birth">
//               <Input
//                 type="date"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//               />
//             </Field>

//             <Field label="Password">
//               <Input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter password"
//                 isRequired
//               />
//             </Field>

//             <Field label="Confirm Password">
//               <Input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Re-enter password"
//                 isRequired
//               />
//             </Field>

//             <Button
//               colorScheme="teal"
//               w="full"
//               type="submit"
//               isLoading={loading}
//               loadingText="Registering..."
//             >
//               Register
//             </Button>
//           </VStack>
//         </Fieldset.Root>
//       </form>

//       <Text mt={6} fontSize="sm" color="gray.600" textAlign="center">
//         Already have an account? Log in instead.
//       </Text>
//     </Box>
//   );
// }


import { useState } from "react";
import * as Auth from "aws-amplify/auth";

import { fetchAuthSession } from "aws-amplify/auth";

fetchAuthSession().then((session) => {
    console.log(session);
  });

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


export default function RegisterForm() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        firstName: "",
        // familyName: "",
        lastName: "",
        dob: "",
        password: "",
        confirmPassword: "",
    })

    const [message, setMessage] = useState("")

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    async function handleRegister(e) {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match")
            return
        }

        console.log("SignUp payload:", {
            username: formData.username,
            password: formData.password,
            attributes: {
                email: formData.email,
                given_name: formData.firstName,
                family_name: formData.lastName,
                birthdate: formData.dob,
            },
        });


        try {
            await Auth.signUp({
                'username': formData.username,
                'password': formData.password,
                'attributes': {
                    'email': formData.email,           // required
                    'given_name': formData.firstName,  // required
                    'family_name': formData.lastName,  // required
                    'birthdate': formData.dob,         // required in YYYY-MM-DD
                },
              })
            setMessage(
                "Registration successful! Please check your email to confirm."
            )
        } catch (err) {
            setMessage(err.message)
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
                Register & Sign Up
            </Heading>

            <form onSubmit={handleRegister}>
                <Fieldset.Root size="lg" maxW="md" >
                    <Stack spacing={5}>
                        <Fieldset.Legend>Create your account</Fieldset.Legend>
                        <Fieldset.HelperText>
                            Please fill in the details below.
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
                                <Field.Label>Email</Field.Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>First Name (Given Name)</Field.Label>
                                <Input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    autoComplete="given-name"
                                    required
                                />
                            </Field.Root>

                            {/* <Field.Root>
                                <Field.Label>Family Name</Field.Label>
                                <Input
                                    name="familyName"
                                    value={formData.familyName}
                                    onChange={handleChange}
                                    autoComplete="given-name"
                                />
                            </Field.Root> */}

                            <Field.Root>
                                <Field.Label>Last Name</Field.Label>
                                <Input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    autoComplete="family-name"
                                    required
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>Date of Birth</Field.Label>
                                <Input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    autoComplete="bday"
                                    required
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
                                    autoComplete="new-password"
                                />
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>Confirm Password</Field.Label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                />
                            </Field.Root>
                        </Fieldset.Content>

                        <Button type="submit" colorScheme="teal" alignSelf="flex-start">
                            Register
                        </Button>
                    </Stack>
                </Fieldset.Root>
            </form>

            {message && (
                <Text mt={4} color="teal.600" fontWeight="medium" textAlign="center">
                    {message}
                </Text>
            )}
        </Box>
    )
}
