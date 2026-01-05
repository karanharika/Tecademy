// RegisterForm.jsx
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom"; import * as Auth from "aws-amplify/auth";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useColorModeValue } from "../components/ui/color-mode";
import { Fieldset, Field, Input, Button, Box, Link, Stack, HStack, Heading, Text, defineStyle, Icon, IconButton, Flex, Container } from "@chakra-ui/react";
import { Eye, EyeOff, Mail, UserPen, UserLock, CalendarDays, ShieldUser } from "lucide-react";
import { getUsers, getUser, createUser } from "../api";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        dob: "",
        password: "",
        confirmPassword: "",
    });

    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

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

        } catch (err) {
            setMessage(err.message);
        }
    }

    async function handleConfirm(e) {
        e.preventDefault();

        let formatdate = `${formData.dob}T${formData.dob}:00.000+05:30`
        let userObject = {
            "FirstName": formData.firstName,
            "LastName": formData.lastName,
            "DOB": formatdate,
            "email": formData.email,
            "username": formData.username,
            "tokens": 100

        }

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

            const response = await createUser(userObject);
            console.log("Response User:", response);

            if (response.status === 200) {
            console.log("User data uploaded to DB");   
        }

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
            const { destination, deliveryMedium } = await resendSignUpCode({
                username,
            });
            setMessage(`📩 A new code has been sent via ${deliveryMedium} to ${destination}`);
        } catch (err) {
            setMessage("❌ " + err.message);
        }
    }

    const boxBg = useColorModeValue("teal.400", "teal.800");
    const buttonBg = useColorModeValue("teal.100", "teal.700");
    const txtColor = useColorModeValue("black", "white");
    const HoverBg = useColorModeValue("teal.200", "gray.700");
    const hoverColor = useColorModeValue("teal.700", "teal.200");
    const highlightColor = useColorModeValue("pink.800", "pink.300");
    const altButtonBg = useColorModeValue("teal.800", "teal.100");
    const altTxtColor = useColorModeValue("white", "black");
    const altHoverBg = useColorModeValue("teal.900", "teal.200");
    const altHoverColor = useColorModeValue("teal.200", "teal.700");

    const bgColor = useColorModeValue("gray.50", "gray.900");
    const cardBg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const inputBorderColor = useColorModeValue("gray.800", "whiteAlpha.800"); // Negative/High Contrast Border

    // Color Mode Values (Moved to top level to avoid conditional hook call error)
    const tealBg = useColorModeValue("teal.50", "teal.900");
    const tealText = useColorModeValue("teal.800", "teal.200");
    const tealSubText = useColorModeValue("teal.600", "teal.300");
    const grayText = useColorModeValue("gray.700", "gray.200");
    const hoverBg = useColorModeValue("gray.50", "gray.700");

    // Predefined Subjects
    const allSubjects = [
        "Artificial Intelligence", "Machine Learning", "Data Science", "Python", "React",
        "JavaScript", "Node.js", "Web Development", "Cybersecurity", "Cloud Computing",
        "DevOps", "Blockchain", "UI/UX Design", "Digital Marketing", "Game Development",
        "Mobile App Dev", "Java", "C++", "SQL", "System Design"
    ];

    const filteredSubjects = allSubjects.filter(sub =>
        sub.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubjectChange = (subject) => {
        if (selectedSubjects.includes(subject)) {
            setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
        } else {
            if (selectedSubjects.length >= 3) {
                alert("You can select up to 3 subjects only.");
                return;
            }
            setSelectedSubjects([...selectedSubjects, subject]);
        }
    };

    const floatingStyles = defineStyle({
        pos: "absolute",
        bg: { base: "{colors.white}", _dark: "{colors.gray.800}" },
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
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg={bgColor}
            backgroundImage={useColorModeValue(
                "radial-gradient(#CBD5E0 1px, transparent 1px)",
                "radial-gradient(#2D3748 1px, transparent 1px)"
            )}
            backgroundSize="20px 20px"
            position="relative"
            overflow="hidden"
        >
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100px"
                h="100px"
                bg="lime"
                borderRadius="full"
                filter="blur(40px)"
                opacity="0.6"
                animation="roam 20s infinite linear"
                zIndex="0"
            />

            <Container maxW="lg" mt={16} mb={16} py={12} px={6} position="relative" zIndex="1">

                <Box
                    rounded="xl"
                    bg={cardBg}
                    boxShadow="2xl"
                    p={8}
                    borderWidth="1px"
                    borderColor={borderColor}>

                    <Stack align="center" mb={8}>
                        <Heading fontSize="4xl" textAlign="center">
                            {isConfirming ? "Confirm Your Account" : "Sign Up"}
                        </Heading>
                        <Text fontSize="lg" color="gray.500" textAlign="center">
                            {isConfirming ? "confirm your account to avail awesome " : "to enjoy all of our cool "}
                            <Link color="teal.500" href="#">features</Link> ✌️
                        </Text>
                    </Stack>

                    {!isConfirming ? (
                        // ---------- Registration Form ----------
                        <form onSubmit={handleRegister}>
                            <Fieldset.Root size="lg" maxW="md">
                                <Stack spacing={5}>

                                    <Fieldset.Legend mt={6} color={txtColor}>Create your account</Fieldset.Legend>
                                    <Fieldset.HelperText>
                                        Please fill in the details below.
                                    </Fieldset.HelperText>

                                    <Fieldset.Content>
                                        <Field.Root>
                                            <Box pos="relative" w="full" mt={5}>
                                                <HStack>
                                                    <Box p={"11.5px"}>
                                                        <Icon as={UserLock} boxSize={6} color={hoverColor} />
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
                                            <Box pos="relative" w="full" mt={5}>
                                                <HStack>
                                                    <Box p={"11.5px"}>
                                                        <Icon as={Mail} boxSize={6} color={hoverColor} />
                                                    </Box>
                                                    <Input
                                                        className="peer"
                                                        placeholder=" "
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        autoComplete="email"
                                                        variant="outline"
                                                        borderColor={HoverBg}
                                                        _hover={{ borderColor: hoverColor }}
                                                        _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}
                                                    />
                                                    <Field.Label css={floatingStyles}>Email</Field.Label>
                                                </HStack>
                                            </Box>
                                        </Field.Root>

                                        <Field.Root>
                                            <Box pos="relative" w="full" mt={5}>
                                                <HStack>
                                                    <Box p={"11.5px"}>
                                                        <Icon as={UserPen} boxSize={6} color={hoverColor} />
                                                    </Box>
                                                    <Input
                                                        className="peer"
                                                        placeholder=" "
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        autoComplete="given-name"
                                                        required
                                                        variant="outline"
                                                        borderColor={HoverBg}
                                                        _hover={{ borderColor: hoverColor }}
                                                        _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}
                                                    />
                                                    <Field.Label css={floatingStyles}>First Name (Given Name)</Field.Label>
                                                </HStack>
                                            </Box>
                                        </Field.Root>

                                        <Field.Root>
                                            <Box pos="relative" w="full" mt={5}>
                                                <HStack>
                                                    <Box p={"11.5px"}>
                                                        <Icon as={UserPen} boxSize={6} color={hoverColor} />
                                                    </Box>
                                                    <Input
                                                        className="peer"
                                                        placeholder=" "
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
                                                        autoComplete="family-name"
                                                        required
                                                        borderColor={HoverBg}
                                                        _hover={{ borderColor: hoverColor }}
                                                        _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}
                                                    />
                                                    <Field.Label css={floatingStyles}>Last Name</Field.Label>
                                                </HStack>
                                            </Box>
                                        </Field.Root>

                                        <Field.Root>
                                            <Box pos="relative" w="full" mt={5}>
                                                <HStack>
                                                    <Box p={"11.5px"}>
                                                        <Icon as={CalendarDays} boxSize={6} color={hoverColor} />
                                                    </Box>
                                                    <Input
                                                        className="peer"
                                                        placeholder=" "
                                                        type="date"
                                                        name="dob"
                                                        value={formData.dob}
                                                        onChange={handleChange}
                                                        autoComplete="bday"
                                                        required
                                                        variant="outline"
                                                        borderColor={HoverBg}
                                                        _hover={{ borderColor: hoverColor }}
                                                        _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}

                                                    />
                                                    <Field.Label css={floatingStyles}>Date of Birth</Field.Label>
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
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                        autoComplete="new-password"
                                                        variant="outline"
                                                        borderColor={HoverBg}
                                                        _hover={{ borderColor: hoverColor }}
                                                        _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}

                                                    />
                                                    <Field.Label css={floatingStyles}>Password</Field.Label>
                                                </HStack>
                                            </Box>
                                        </Field.Root>

                                        <Field.Root>
                                            <Box pos="relative" w="full" mt={2}>
                                                <HStack>
                                                    <Box p={"11.5px"}>
                                                        <Icon as={ShieldUser} boxSize={6} color={hoverColor} />
                                                    </Box>
                                                    <Input
                                                        className="peer"
                                                        placeholder=""
                                                        type={showPassword ? "text" : "password"}
                                                        name="confirmPassword"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        required
                                                        autoComplete="new-password"
                                                        variant="outline"
                                                        borderColor={HoverBg}
                                                        _hover={{ borderColor: hoverColor }}
                                                        _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}
                                                    />
                                                    <Field.Label css={floatingStyles}>Confirm Password</Field.Label>
                                                </HStack>
                                            </Box>
                                        </Field.Root>
                                    </Fieldset.Content>

                                    <Button
                                        bg={altButtonBg}
                                        color={altTxtColor}
                                        _hover={{ bg: altHoverBg, color: altHoverColor, transform: "translateY(-2px)", shadow: "md" }}
                                        mt={7}
                                        mb={3}
                                        ml={"60px"}
                                        maxW="3xs"
                                        w="full"
                                        type="submit" alignSelf="flex-start">
                                        Next
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
                                                borderColor={HoverBg}
                                                onChange={(e) => setConfirmationCode(e.target.value)}
                                                required

                                            />
                                        </Field.Root>
                                    </Fieldset.Content>

                                    <Stack direction="row" spacing={4}>
                                        <Button
                                            bg={altButtonBg}
                                            color={altTxtColor}
                                            _hover={{ bg: altHoverBg, color: altHoverColor, transform: "translateY(-2px)", shadow: "md" }}
                                            type="submit" >
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
                    <Stack pt={6}>
                        <Text align="center">
                            Already a user? <Link as={RouterLink} to="/login" color="teal.500">Login</Link>
                        </Text>
                    </Stack>

                    {message && (
                        <Text mt={4} color={hoverColor} fontWeight="medium" textAlign="center">
                            {message}
                        </Text>
                    )}

                </Box>
            </Container>
        </Flex>
    );
}
