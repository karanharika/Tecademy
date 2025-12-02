import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
    Box,
    Button,
    Input,
    Stack,
    Heading,
    Text,
    Link,
    Flex,
    Container,
    HStack,
    Badge,
    // Highlight removed
    Checkbox
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";

export default function RegisterForm() {
    const { register } = useAuth();
    const navigate = useNavigate();

    // Step State
    const [step, setStep] = useState(1);

    // Form State
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [error, setError] = useState("");

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

    const handleNext = () => {
        if (!username || !password || !email || !firstName || !lastName) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await register(username, password, email, firstName, lastName, selectedSubjects);
            navigate("/login");
        } catch (err) {
            setError("Registration failed. Try again.");
        }
    };

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
            {/* Lime Ball Animation */}
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

            <Container maxW="lg" py={12} px={6} position="relative" zIndex="1">
                <Box
                    rounded="xl"
                    bg={cardBg}
                    boxShadow="2xl"
                    p={8}
                    borderWidth="1px"
                    borderColor={borderColor}
                >
                    <Stack align="center" mb={8}>
                        <Heading fontSize="4xl" textAlign="center">Sign up</Heading>
                        <Text fontSize="lg" color="gray.500" textAlign="center">
                            to enjoy all of our cool <Link color="teal.500" href="#">features</Link> ✌️
                        </Text>
                    </Stack>

                    {error && (
                        <Box mb={4} p={3} bg="red.100" color="red.700" borderRadius="md">
                            {error}
                        </Box>
                    )}

                    <form onSubmit={handleSubmit}>
                        {step === 1 ? (
                            <Stack spacing={4}>
                                <HStack>
                                    <Box>
                                        <Text mb={1} fontWeight="medium">First Name</Text>
                                        <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} borderColor={inputBorderColor} />
                                    </Box>
                                    <Box>
                                        <Text mb={1} fontWeight="medium">Last Name</Text>
                                        <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} borderColor={inputBorderColor} />
                                    </Box>
                                </HStack>
                                <Box>
                                    <Text mb={1} fontWeight="medium">Email address</Text>
                                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} borderColor={inputBorderColor} />
                                </Box>
                                <Box>
                                    <Text mb={1} fontWeight="medium">Username</Text>
                                    <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} borderColor={inputBorderColor} />
                                </Box>
                                <Box>
                                    <Text mb={1} fontWeight="medium">Password</Text>
                                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} borderColor={inputBorderColor} />
                                </Box>

                                <Button colorScheme="teal" size="lg" fontSize="md" onClick={handleNext} mt={4} w="full">
                                    Next
                                </Button>
                            </Stack>
                        ) : (
                            <Stack spacing={4}>
                                <Box bg={tealBg} p={4} borderRadius="md" borderLeft="4px solid" borderColor="teal.500">
                                    <Text fontSize="lg" fontWeight="bold" color={tealText}>
                                        To earn tokens you have to <Box as="span" px="1" py="1" bg="teal.200" color="teal.800">share your knowledge</Box>
                                    </Text>
                                    <Text fontSize="sm" color={tealSubText} mt={1}>
                                        Select up to 3 subjects you can teach.
                                    </Text>
                                </Box>

                                <Checkbox.Root
                                    checked={selectedSubjects.length === 0 && searchQuery === "NOSUBJECT"}
                                    onCheckedChange={(e) => {
                                        if (e.checked) {
                                            setSelectedSubjects([]);
                                            setSearchQuery("NOSUBJECT"); // Marker for no subject
                                        } else {
                                            setSearchQuery("");
                                        }
                                    }}
                                    colorPalette="teal"
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control>
                                        <Checkbox.Indicator />
                                    </Checkbox.Control>
                                    <Checkbox.Label fontWeight="bold" color={grayText}>
                                        I do not want to teach any subjects (NO SUBJECT)
                                    </Checkbox.Label>
                                </Checkbox.Root>

                                <Input
                                    placeholder="Search subjects (e.g. AI, React)..."
                                    value={searchQuery === "NOSUBJECT" ? "" : searchQuery}
                                    onChange={(e) => {
                                        // If user starts typing, clear "NOSUBJECT" state
                                        if (searchQuery === "NOSUBJECT") {
                                            setSearchQuery("");
                                        }
                                        setSearchQuery(e.target.value);
                                    }}
                                    borderColor={inputBorderColor}
                                    disabled={searchQuery === "NOSUBJECT"}
                                />

                                <Box maxH="300px" overflowY="auto" borderWidth="1px" borderRadius="md" p={2} borderColor={borderColor}>
                                    <Stack spacing={2}>
                                        {filteredSubjects.map(subject => (
                                            <Box
                                                key={subject}
                                                p={2}
                                                borderWidth="1px"
                                                borderRadius="md"
                                                bg={selectedSubjects.includes(subject) ? "teal.50" : "transparent"}
                                                borderColor={selectedSubjects.includes(subject) ? "teal.500" : "transparent"}
                                                _dark={{
                                                    bg: selectedSubjects.includes(subject) ? "teal.900" : "transparent",
                                                    borderColor: selectedSubjects.includes(subject) ? "teal.500" : "transparent",
                                                }}
                                                cursor="pointer"
                                                onClick={() => handleSubjectChange(subject)}
                                                _hover={{ bg: hoverBg }}
                                            >
                                                <HStack justify="space-between">
                                                    <Text>{subject}</Text>
                                                    {selectedSubjects.includes(subject) && <Badge colorScheme="teal">Selected</Badge>}
                                                </HStack>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>

                                <HStack justify="space-between" mt={4}>
                                    <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                                    <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
                                        Register
                                    </Button>
                                </HStack>
                            </Stack>
                        )}
                    </form>

                    <Stack pt={6}>
                        <Text align="center">
                            Already a user? <Link as={RouterLink} to="/login" color="teal.500">Login</Link>
                        </Text>
                    </Stack>
                </Box >
            </Container >
        </Flex >
    );
}
