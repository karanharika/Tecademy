//Navbar.js
import { useState } from "react";
import { Box, Flex, HStack, VStack, IconButton, Link, Heading, Button, Avatar, Text, } from "@chakra-ui/react";
import { Menu, X, GraduationCap, Sun, Moon } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { useAuthContext } from "../auth/AuthProvider";

// const Links = [
//   { name: "Home", path: "/" },
//   { name: "About", path: "/about" },
//   { name: "FAQs", path: "/faq" },

// ];

function NavLink({ to, children }) {
  const linkHoverBg = useColorModeValue("teal.200", "teal.800");
  const linkActiveBg = useColorModeValue("teal.300", "teal.900");
  const linkColor = useColorModeValue("gray.800", "white");

  return (
    <Link
      as={RouterLink}
      to={to}
      px={3}
      py={2}
      rounded={"md"}
      _hover={{ bg: linkHoverBg, color: linkColor }}
      _activeLink={{ bg: linkActiveBg, color: "teal" }}
      color={linkColor}
      display="block"
      fontWeight="semibold"
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpened, setIsOpen] = useState(false);
  const navBg = useColorModeValue("rgba(56, 178, 172, 0.6)", "rgba(19, 78, 74, 0.6)");
  const glassBg = useColorModeValue("blackAlpha.300", "blackAlpha.600");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const dropdownBg = useColorModeValue("teal.200", "teal.800");
  const headingColor = useColorModeValue("black", "white");
  const altButtonBg = useColorModeValue("teal.800", "teal.100");
  const altTxtColor = useColorModeValue("white", "black");
  const altHoverBg = useColorModeValue("teal.900", "teal.200");
  const altHoverColor = useColorModeValue("teal.200", "teal.700");
  const colorPalette = ["teal", "pink", "cyan", "blue", "orange", "purple"];
  const linkHoverBg = useColorModeValue("teal.200", "teal.800");
  const linkActiveBg = useColorModeValue("teal.300", "teal.900");
  const linkColor = useColorModeValue("gray.800", "white");

  const pickPalette = (name) => {
    const index = name.charCodeAt(0) % colorPalette.length
    return colorPalette[index]
  }

  const { user, logout } = useAuthContext();

  const Links = [
    { name: user ? "Dashboard" : "Home", path: user ? "/dashboard" : "/" },
    { name: "About", path: "/about" },
    { name: "FAQs", path: "/faq" },
  ];

  // ✅ Safely extract username/email from Amplify v6 user object
  const displayName =
    user?.attributes?.given_name ||
    // user?.attributes?.email ||
    // user?.signInDetails?.loginId ||
    // user?.username ||
    "User";
  const avatarName = user?.attributes?.given_name + " " + user?.attributes?.family_name;

  return (
    <Box
      bg={glassBg}
      px={4}
      position="fixed"
      top="0"
      left="0"
      w="100%"
      zIndex="1000"
      borderBottomWidth="1px"
      borderColor={borderColor}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        {/* Brand / Logo */}
        <Box fontWeight="bold" color="white">
          <HStack as={RouterLink} to="/">
            <GraduationCap size={40} color={headingColor} />
            <Heading
              size="2xl"
              letterSpacing="tight"
              fontWeight="semibold"
              color={headingColor}
            >
              Tecademy
            </Heading>
          </HStack>
        </Box>

        {/* Desktop Menu */}
        <HStack spacing={6} display={{ base: "none", md: "flex" }}>

          {Links.map((link) => (
            <NavLink key={link.name} to={link.path}>
              {link.name}
            </NavLink>
          ))}

          {/* ✅ Auth Section */}
          {user ? (
            <HStack spacing={6}>

              <Avatar.Root size="md" colorPalette={pickPalette(avatarName)}>
                <Avatar.Fallback name={avatarName} />
                <Avatar.Image src="#" />
              </Avatar.Root>
              <VStack spacing={0} align="start">
                <Text fontWeight="normal">Hello, {displayName}</Text>
                {/* {user?.attributes?.email && (
                  <Text fontSize="sm" color="gray.200">
                    {user.attributes.email}
                  </Text>
                )} */}
              </VStack>
              <Button
                onClick={logout}
                bg={altButtonBg} color={altTxtColor}
                _hover={{ bg: altHoverBg, color: altHoverColor, transform: "translateY(-2px)", shadow: "md" }}
                size="sm"
                variant="solid"
                rounded="full"
              >
                Logout
              </Button>
            </HStack>
          ) : (
            <HStack spacing={6}>
              <Button
                as={RouterLink}
                to="/login"
                variant="ghost"
                color={headingColor}
                _hover={{ bg: altHoverBg, color: altHoverColor }}
                size="sm"
                rounded="full"
              >
                Login
              </Button>

              <Button
                as={RouterLink}
                to="/register"
                bg={altButtonBg} color={altTxtColor}
                _hover={{ bg: altHoverBg, color: altHoverColor }}
                size="sm"
                rounded="full"
              >
                Sign Up
              </Button>

            </HStack>
          )}

          {/* Dark mode toggle */}
          <IconButton
            size="md"
            aria-label="Toggle Dark Mode"
            onClick={toggleColorMode}
            ml={2}
            variant="ghost"
            bg="transparent"
            color={colorMode === "light" ? "grey" : "yellow.500"}
            _hover={{ bg: "teal.500" }}
            rounded="full"
          >
            {colorMode === "dark" ? <Sun /> : <Moon />}
          </IconButton>
        </HStack>

        {/* Hamburger (mobile only) */}
        <IconButton
          size="md"
          aria-label="Toggle Menu"
          display={{ md: "none" }}
          onClick={() => setIsOpen(!isOpened)}
          color="white"
          variant="ghost"
          bg="transparent"
          _hover={{ bg: "teal.500" }}
        >
          {isOpened ? <X color={headingColor} /> : <Menu color={headingColor} />}
        </IconButton>
      </Flex>

      {/* Mobile Dropdown */}
      {isOpened && (
        <Box
          bg={dropdownBg}
          margin="2%"
          width="50%"
          position="fixed"
          right="0"
          p={4}
          display={{ md: "none" }}
          borderRadius="md"
        >
          <VStack as="nav" spacing={5}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}

            {/* ✅ Mobile auth */}
            {user ? (
              <VStack spacing={3}>
                <Avatar.Root colorPalette={pickPalette(avatarName)}>
                  <Avatar.Fallback name={avatarName} />
                  <Avatar.Image src="#" />
                </Avatar.Root>
                <Text>Hello, {displayName}</Text>
                <Button onClick={logout} size="sm" w="full" rounded="full" bg={altButtonBg} color={altTxtColor}
                  _hover={{ bg: altHoverBg, color: altHoverColor }} >
                  Logout
                </Button>
              </VStack>
            ) : (
              <VStack spacing={3}>
                <Button
                  as={RouterLink}
                  to="/login"
                  variant="ghost"
                  color={headingColor}
                  _hover={{ bg: altHoverBg, color: altHoverColor }}
                  size="sm"
                  w="full"
                  rounded="full"
                >
                  Login
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  colorScheme="teal"
                  size="sm"
                  w="full"
                  bg={altButtonBg} color={altTxtColor}
                  _hover={{ bg: altHoverBg, color: altHoverColor }}
                  rounded="full"
                >
                  Sign Up
                </Button>
              </VStack>
            )}

            <IconButton
              size="md"
              aria-label="Toggle Dark Mode"
              onClick={toggleColorMode}
              ml={2}
              variant="ghost"
              bg="transparent"
              color={colorMode === "light" ? "grey" : "yellow.500"}
              _hover={{ bg: "teal.500" }}
              rounded="full"
            >
              {colorMode === "dark" ? <Sun /> : <Moon />}
            </IconButton>
          </VStack>
        </Box>
      )}
    </Box>
  );
}
