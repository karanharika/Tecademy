

// RegisterForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Auth from "aws-amplify/auth";
import { confirmSignUp } from "aws-amplify/auth";

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
        lastName: "",
        dob: "",
        password: "",
        confirmPassword: "",
    });

    const [confirmationCode, setConfirmationCode] = useState("");
    const [isConfirming, setIsConfirming] = useState(false);
    const [message, setMessage] = useState("");
    const [pendingUsername, setPendingUsername] = useState(
        localStorage.getItem("pendingUsername") || ""
    );

    const navigate = useNavigate(); // ✅ for redirect

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleRegister(e) {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const birthdate = formData.dob?.slice(0, 10) ?? "";

            await Auth.signUp({
                username: formData.username,
                password: formData.password,
                options: {
                    userAttributes: {
                        email: formData.email,
                        given_name: formData.firstName,
                        family_name: formData.lastName,
                        birthdate,
                    },
                },
            });
            setPendingUsername(formData.username);
            localStorage.setItem("pendingUsername", formData.username);
            setIsConfirming(true);   // switch UI to confirm
            setMessage("We emailed you a confirmation code. Please enter it here.");

            //   setIsConfirming(true); // switch to confirmation form
            // localStorage.setItem("pendingUsername", formData.username); // ✅ store username
            // setIsConfirming(true);


        } catch (err) {
            setMessage(err.message);
        }
    }

    // async function handleConfirm(e) {
    // e.preventDefault();
    // try {
    //     await Auth.confirmSignUp(formData.username, confirmationCode);
    //     setMessage("Your account has been confirmed! Redirecting to login...");

    //     // Optional: clear form after confirmation
    //     setFormData({
    //         username: "",
    //         email: "",
    //         firstName: "",
    //         lastName: "",
    //         dob: "",
    //         password: "",
    //         confirmPassword: "",
    //     });
    //     setConfirmationCode("");
    //     setIsConfirming(false);

    //     // ✅ Redirect to login page after short delay
    //     setTimeout(() => {
    //         navigate("/login");
    //     }, 1500);
    // } catch (err) {
    //     setMessage(err.message);
    // }
    // }

    async function handleConfirm(e) {
        e.preventDefault();
        try {
            const username = pendingUsername || localStorage.getItem("pendingUsername");
            console.log(username);
            if (!username) {
                setMessage("No username found. Please register again.");
                return;
            }

            // await Auth.confirmSignUp(username, confirmationCode);
            await confirmSignUp({
                username,
                confirmationCode
              });

            setMessage("✅ Your account is confirmed! Redirecting to login...");
            localStorage.removeItem("pendingUsername");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            setMessage("❌ " + err.message);
            // stay on confirm page
        }
    }



    // async function handleResendCode() {
    //     try {
    //         await Auth.resendSignUpCode(formData.username);
    //         setMessage("A new confirmation code has been sent to your email.");
    //     } catch (err) {
    //         setMessage(err.message);
    //     }
    // }

    async function handleResendCode() {
        try {
            const username = pendingUsername || localStorage.getItem("pendingUsername");
            if (!username) {
              setMessage("No username found. Please register again.");
              return;
            }
            await Auth.resendSignUpCode(username);
            setMessage("📩 A new code has been sent.");
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
                {isConfirming ? "Confirm Your Account" : "Register & Sign Up"}
            </Heading>

            {!isConfirming ? (
                // ---------- Registration Form ----------
                <form onSubmit={handleRegister}>
                    <Fieldset.Root size="lg" maxW="md">
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
                                        autoComplete="new-password"
                                    />
                                </Field.Root>
                            </Fieldset.Content>

                            <Button type="submit" colorScheme="teal" alignSelf="flex-start">
                                Register
                            </Button>
                        </Stack>
                    </Fieldset.Root>
                </form>
            ) : (
                // ---------- Confirmation Form ----------
                <form onSubmit={handleConfirm}>
                    <Fieldset.Root size="lg" maxW="md">
                        <Stack spacing={5}>
                            <Fieldset.Legend>Enter Confirmation Code</Fieldset.Legend>
                            <Fieldset.HelperText>
                                Please enter the code sent to your email.
                            </Fieldset.HelperText>

                            <Fieldset.Content>
                                <Field.Root>
                                    <Field.Label>Confirmation Code</Field.Label>
                                    <Input
                                        name="confirmationCode"
                                        value={confirmationCode}
                                        onChange={(e) => setConfirmationCode(e.target.value)}
                                        required

                                    />
                                </Field.Root>
                            </Fieldset.Content>

                            <Stack direction="row" spacing={4}>
                                <Button type="submit" colorScheme="teal">
                                    Confirm Account
                                </Button>
                                <Button variant="outline" onClick={handleResendCode}>
                                    Resend Code
                                </Button>
                            </Stack>
                        </Stack>
                    </Fieldset.Root>
                </form>
            )}

            {message && (
                <Text mt={4} color="teal.300" fontWeight="medium" textAlign="center">
                    {message}
                </Text>
            )}
        </Box>
    );
}
