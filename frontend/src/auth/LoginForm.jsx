// LoginForm.jsx
import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import { useAuthContext } from "./AuthProvider";
import { useNavigate, Link as RouterLink  } from "react-router-dom";
// import { useNavigate, Link as RouterLink } from "react-router-dom"; import * as Auth from "aws-amplify/auth";
import { useColorModeValue } from "../components/ui/color-mode";
import {
  Fieldset, Field, Input, Button, Box, Stack, Heading,
  Text, defineStyle, HStack, Flex, Container, Link,
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
      setTimeout(() => navigate("/dashboard"), 1000);
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
  const inputBorderColor = useColorModeValue("gray.800", "whiteAlpha.800");

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
            <Heading fontSize="3xl" textAlign="center">Sign in to Tecademy</Heading>
            <Text fontSize="lg" color="gray.500">
              Welcome back! 👋
            </Text>
          </Stack>

          <form onSubmit={handleLogin}>
            <Fieldset.Root size="lg" maxW="md" color={txtColor}>
              <Stack spacing={5}>

                <Fieldset.Legend mt={6} color={txtColor}>Login</Fieldset.Legend>
                <Fieldset.HelperText>
                  Enter your login information below.
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
                  _hover={{ bg: altHoverBg, color: altHoverColor, transform: "translateY(-2px)", shadow: "md" }}
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

          <Stack pt={6}>
            <Text align="center">
              New user? <Link as={RouterLink} to="/register" color="teal.500">Create an account</Link>
            </Text>
          </Stack>

        </Box>
      </Container>
    </Flex>
  );
}
