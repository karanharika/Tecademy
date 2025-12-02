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
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const inputBorderColor = useColorModeValue("gray.800", "whiteAlpha.800");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const result = await login(username, password);
      if (result?.error) {
        throw new Error(result.error);
      }
      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  }

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
            <Stack spacing={4}>
              <Box>
                <Text mb={1} fontWeight="medium">Username</Text>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  bg={useColorModeValue("white", "gray.700")}
                  borderColor={inputBorderColor}
                />
              </Box>
              <Box>
                <Text mb={1} fontWeight="medium">Password</Text>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg={useColorModeValue("white", "gray.700")}
                  borderColor={inputBorderColor}
                />
              </Box>

              <Button type="submit" colorScheme="teal" size="lg" fontSize="md" mt={4} w="full">
                Login
              </Button>
            </Stack>
          </form>

          {message && (
            <Box mt={4} p={3} bg={message.includes("✅") ? "green.100" : "red.100"} color={message.includes("✅") ? "green.700" : "red.700"} borderRadius="md" textAlign="center">
              {message}
            </Box>
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
