import { useState, useEffect } from 'react';
import { useAuth } from "../../auth/useAuth";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useColorMode, useColorModeValue } from "../../components/ui/color-mode";
import {
    Flex, Box, Heading, Text, Button, For, Stack,
    Card, Image, Highlight, HStack, Link,
    Fieldset, Field, Input, defineStyle, Icon, IconButton
} from "@chakra-ui/react";

import { BookOpen, UserPen, CalendarDays, ShieldUser, FlaskConical, Clock, CodeXml } from "lucide-react";
import { getUsers, getUser, createPost } from "../../api";



export default function Host() {

    const { user, loading } = useAuth();
    // const { user } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;


    const [dbuser, setUser] = useState([])

    useEffect(() => {
        async function loadUser() {
            let data = await getUser(user.username)
            if (data) {
                setUser(data)
                console.log(dbuser)
                // console.log(user.attributes.given_name + " " + user.attributes.family_name )
            }
        }

        loadUser()
    }, [])

    const [formData, setFormData] = useState({
        course: "",
        Branch: "",
        sessDate: "",
        sessTime: "",
        join_link: "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        console.log(formData);
    }



    const navigate = useNavigate();

    async function handlePostSubmit(e) {
        e.preventDefault();

        let formatdate = `${formData.sessDate}T${formData.sessTime}:00.000+05:30`

        let postObject = {
            "Branch": formData.Branch,
            "course_name": formData.course,
            "instructor_fname": dbuser.FirstName,
            "instructor_lname": dbuser.LastName,
            "date_created": new Date(),
            "session_date": formatdate,
            "join_link": formData.join_link
        }

        console.log(postObject)
        try {
        const response = await createPost(postObject);

        console.log("Response:", response);

        if (response.status === 200) {
            navigate("/dashboard");   
        }
    } catch (err) {
        console.error("POST Error:", err);
    }

    }

    const HoverBg = useColorModeValue("teal.200", "teal.900");
    const hoverColor = useColorModeValue("teal.700", "teal.200");
    const altHoverBg = useColorModeValue("teal.900", "teal.200");
    const altHoverColor = useColorModeValue("teal.200", "teal.700");
    const altButtonBg = useColorModeValue("teal.800", "teal.100");
    const altTxtColor = useColorModeValue("white", "black");
    const boxBg = useColorModeValue("teal.400", "teal.800");
    const txtColor = useColorModeValue("black", "white");

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
        <Box mt={16} left="0" w="100%">

            <Flex gap="4" mt={"5%"}>
                <Box w={"50%"}> <Heading size="5xl">Host</Heading></Box>
                <Box w={"50%"} textAlign="right"><Text mt={"1%"} >Welcome back, {user.username}!</Text> </Box>
            </Flex>

            <Flex gap="4" mt={7}>
                <Box w={"50%"}> <Heading size="xl" fontWeight={"ml"}>Host a session to share knowdelge with others</Heading></Box>
                <Box w={"50%"} textAlign="right">
                    <Button
                        as={RouterLink}
                        to="/dashboard"
                        variant="solid"
                        bg={altButtonBg} color={altTxtColor}
                        _hover={{ bg: altHoverBg, color: altHoverColor }}
                    >
                        Back to Dashboard
                    </Button>
                </Box>
            </Flex>

            <Box
                // minH="100vh"
                w="100%"
                mt="16"
                display="flex"
                alignItems="center"
                justifyContent="center">

                <Box
                    maxW="lg"
                    w="100%"
                    mt="10"
                    p={6}
                    borderRadius="2xl"
                    boxShadow="md"
                    bg={boxBg}>

                    <Heading mb={6} textAlign="center" fontSize="3xl" color={hoverColor}>Teach and earn Teccatokens</Heading>

                    <form onSubmit={handlePostSubmit}>
                        <Fieldset.Root size="lg" maxW="md">
                            <Stack spacing={5}>
                                <Fieldset.Legend mt={2} color={txtColor}>Host your session</Fieldset.Legend>
                                <Fieldset.HelperText>
                                    Please fill in the details below.
                                </Fieldset.HelperText>

                                <Fieldset.Content>

                                    <Field.Root>
                                        <Box pos="relative" w="full" mt={5}>
                                            <HStack>

                                                <Box p={"11.5px"}>
                                                    <Icon as={ShieldUser} boxSize={6} color={hoverColor} />
                                                </Box>
                                                <Input
                                                    className="peer"
                                                    placeholder=" "
                                                    name="username"
                                                    value={dbuser.username}
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
                                                    <Icon as={UserPen} boxSize={6} color={hoverColor} />
                                                </Box>
                                                <Input
                                                    className="peer"
                                                    placeholder=" "
                                                    name="firstName"
                                                    value={dbuser.FirstName}
                                                    onChange={handleChange}
                                                    autoComplete="given-name"
                                                    required
                                                    variant="outline"
                                                    borderColor={HoverBg}
                                                    _hover={{ borderColor: hoverColor }}
                                                    _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}
                                                />
                                                <Field.Label css={floatingStyles}>First Name</Field.Label>
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
                                                    value={dbuser.LastName}
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
                                                    <Icon as={BookOpen} boxSize={6} color={hoverColor} />
                                                </Box>
                                                <Input
                                                    className="peer"
                                                    placeholder=" "
                                                    name="course"
                                                    value={formData.course}
                                                    onChange={handleChange}
                                                    autoComplete="family-name"
                                                    required
                                                    borderColor={HoverBg}
                                                    _hover={{ borderColor: hoverColor }}
                                                    _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}
                                                />
                                                <Field.Label css={floatingStyles}>Course Name</Field.Label>
                                            </HStack>
                                        </Box>
                                    </Field.Root>

                                    <Field.Root>
                                        <Box pos="relative" w="full" mt={5}>
                                            <HStack>
                                                <Box p={"11.5px"}>
                                                    <Icon as={FlaskConical} boxSize={6} color={hoverColor} />
                                                </Box>
                                                <Input
                                                    className="peer"
                                                    placeholder=" "
                                                    name="Branch"
                                                    value={formData.Branch}
                                                    onChange={handleChange}
                                                    autoComplete="family-name"
                                                    required
                                                    borderColor={HoverBg}
                                                    _hover={{ borderColor: hoverColor }}
                                                    _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}
                                                />
                                                <Field.Label css={floatingStyles}>Branch Name</Field.Label>
                                            </HStack>
                                        </Box>
                                    </Field.Root>


                                    <Field.Root>
                                        <Box pos="relative" w="full" mt={5}>
                                            <HStack>
                                                <Box p={"11.5px"}>
                                                    <Icon as={CodeXml} boxSize={6} color={hoverColor} />
                                                </Box>
                                                <Input
                                                    className="peer"
                                                    placeholder=" "
                                                    name="join_link"
                                                    value={formData.join_link}
                                                    onChange={handleChange}
                                                    autoComplete="name"
                                                    required
                                                    borderColor={HoverBg}
                                                    _hover={{ borderColor: hoverColor }}
                                                    _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}
                                                />
                                                <Field.Label css={floatingStyles}>Online Meeting Link</Field.Label>
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
                                                    name="sessDate"
                                                    value={formData.sessDate}
                                                    onChange={handleChange}
                                                    autoComplete="bday"
                                                    required
                                                    variant="outline"
                                                    borderColor={HoverBg}
                                                    _hover={{ borderColor: hoverColor }}
                                                    _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}

                                                />
                                                <Field.Label css={floatingStyles}>Session Date</Field.Label>
                                            </HStack>
                                        </Box>
                                    </Field.Root>

                                    <Field.Root>
                                        <Box pos="relative" w="full" mt={5}>
                                            <HStack>
                                                <Box p={"11.5px"}>
                                                    <Icon as={Clock} boxSize={6} color={hoverColor} />
                                                </Box>
                                                <Input
                                                    className="peer"
                                                    placeholder=" "
                                                    type="time"
                                                    name="sessTime"
                                                    value={formData.sessTime}
                                                    onChange={handleChange}
                                                    autoComplete="time"
                                                    required
                                                    variant="outline"
                                                    borderColor={HoverBg}
                                                    _hover={{ borderColor: hoverColor }}
                                                    _focus={{ borderColor: hoverColor, boxShadow: `0 0 0 1px ${hoverColor}` }}

                                                />
                                                <Field.Label css={floatingStyles}>Session Time</Field.Label>
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
                                    type="submit" alignSelf="flex-start">
                                    Submit
                                </Button>

                            </Stack>
                        </Fieldset.Root>





                    </form>

                </Box>
            </Box>



        </Box>
    );
}
