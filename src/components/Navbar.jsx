// import { useState } from "react";
// import { Box, Flex, HStack, VStack, IconButton, Link, useDisclosure, Stack, Heading } from "@chakra-ui/react";
// import { Menu, X, GraduationCap, Sun, Moon } from "lucide-react";   // using Lucide icons
// import { Link as RouterLink } from "react-router-dom";
// import { useColorMode, useColorModeValue } from "./ui/color-mode";
// import { useAuth } from "../auth/useAuth";

// const Links = [
//   { name: "Home", path: "/" },
//   { name: "About", path: "/about" },
//   { name: "Contact", path: "/contact" },
// ];

// function NavLink({ to, children }) {
//   const linkHoverBg = useColorModeValue("teal.200", "teal.800");
//   const linkActiveBg = useColorModeValue("teal.100", "teal.900");
//   const linkColor = useColorModeValue("gray.800", "white");

//   return (
//     <Link
//       as={RouterLink}
//       to={to}
//       px={3}
//       py={2}
//       rounded={"md"}
//       _hover={{ bg: linkHoverBg, color: linkColor }}
//       _activeLink={{ bg: linkActiveBg, color: "white" }}
//       color={linkColor}
//       display="block"
//     >
//       {children}
//     </Link>
//   );
// }

// export default function MyNavbar() {
//   // const { isOpen, onOpen, onClose } = useDisclosure();
//   const { colorMode, toggleColorMode } = useColorMode();
//   const [isOpened, setIsOpen] = useState(false);
//   const navBg = useColorModeValue("teal.400", "teal.700");
//   const dropdownBg = useColorModeValue("teal.200", "teal.800");
//   const headingColor = useColorModeValue("black", "white");


//   return (
//     <Box bg={navBg} px={4} color="white" position="fixed" top="0" left="0" w="100%" zIndex="1000">
//       <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
//         {/* Brand / Logo */}
//         <Box fontWeight="bold" color="white">
//           <HStack>
//             <GraduationCap size={40} color={headingColor}/>
//             <Heading
//               size="2xl"
//               letterSpacing="tight"
//               fontWeight="semibold"
//               color={headingColor}
//             >Tecademy
//             </Heading>
//           </HStack>


//         </Box>

//         {/* Desktop Menu */}
//         <HStack spacing={6} display={{ base: "none", md: "flex" }}>
//           {Links.map((link) => (
//             <NavLink key={link.name} to={link.path}>
//               {link.name}
//             </NavLink>
//           ))}

//           <IconButton
//             size="md"
//             aria-label="Toggle Dark Mode"
//             onClick={toggleColorMode}
//             ml={2}
//             variant="ghost"
//             bg="transparent"
//             color={colorMode === "light" ? "grey" : "yellow.500"}
//             _hover={{ bg: "teal.500" }}
//             rounded="full"
//           > {colorMode === "dark" ? <Sun /> : <Moon />}  </IconButton>
//         </HStack>



//         {/* Hamburger (mobile only) */}
//         <IconButton
//           size="md"
//           // icon={isOpen ? <X /> : <Menu />}
//           //icon={isOpen ? <CloseIcon/> : <MenuIcon/>}
//           aria-label="Toggle Menu"
//           display={{ md: "none" }}
//           //onClick={isOpen ? onClose : onOpen}
//           onClick={() => setIsOpen(!isOpened)}
//           color="white"
//           variant="ghost"
//           bg="transparent"
//           _hover={{ bg: "teal.500" }}
//         > {isOpened ? <X color={headingColor}/> : <Menu color={headingColor}/>}</IconButton>


//       </Flex>

//       {/* Mobile Dropdown */}
//       {isOpened && (
//         <Box
//           data-state="open"
//           _open={{
//             animationName: "fade-in, scale-in",
//             animationDuration: "500ms",
//           }}
//           _closed={{
//             animationName: "fade-out, scale-out",
//             animationDuration: "1000ms",
//           }}

//           bg={dropdownBg}
//           margin="2%"
//           width='25%'
//           position='fixed'
//           right="0"
//           p={4}
//           display={{ md: "none" }}
//           borderRadius="md"

//         >
//           <VStack as="nav" spacing={5}>
//             {Links.map((link) => (
//               <NavLink key={link.name} to={link.path}>
//                 {link.name}
//               </NavLink>
//             ))}

//             <IconButton
//               size="md"
//               aria-label="Toggle Dark Mode"
//               onClick={toggleColorMode}
//               ml={2}
//               variant="ghost"
//               bg="transparent"
//               color={colorMode === "light" ? "grey" : "yellow.500"}
//               _hover={{ bg: "teal.500" }}
//               rounded="full"
//             > {colorMode === "dark" ? <Sun /> : <Moon />}  </IconButton>
//           </VStack>
//         </Box>
//       )}
//     </Box>
//   );
// }


import { useState } from "react";
import { Box, Flex, HStack, VStack, IconButton, Link, useDisclosure,
         Stack, Heading, Button, Avatar, Text,} from "@chakra-ui/react";
import { Menu, X, GraduationCap, Sun, Moon } from "lucide-react"; // using Lucide icons
import { Link as RouterLink } from "react-router-dom";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { useAuth } from "../auth/useAuth";

const Links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function NavLink({ to, children }) {
  const linkHoverBg = useColorModeValue("teal.200", "teal.800");
  const linkActiveBg = useColorModeValue("teal.100", "teal.900");
  const linkColor = useColorModeValue("gray.800", "white");

  return (
    <Link
      as={RouterLink}
      to={to}
      px={3}
      py={2}
      rounded={"md"}
      _hover={{ bg: linkHoverBg, color: linkColor }}
      _activeLink={{ bg: linkActiveBg, color: "white" }}
      color={linkColor}
      display="block"
    >
      {children}
    </Link>
  );
}

export default function MyNavbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpened, setIsOpen] = useState(false);
  const navBg = useColorModeValue("teal.400", "teal.700");
  const dropdownBg = useColorModeValue("teal.200", "teal.800");
  const headingColor = useColorModeValue("black", "white");

  // const { user, logout } = useAuth(); // ✅ from your auth hook
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;

  return (
    <Box
      bg={navBg}
      px={4}
      color="white"
      position="fixed"
      top="0"
      left="0"
      w="100%"
      zIndex="1000"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        {/* Brand / Logo */}
        <Box fontWeight="bold" color="white">
          <HStack>
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
            <HStack spacing={3}>
              <Avatar size="sm" name={user.username} />
              <Text>Hello, {user.username}</Text>
              <Button
                onClick={logout}
                colorScheme="red"
                size="sm"
                variant="solid"
              >
                Logout
              </Button>
            </HStack>
          ) : (
            <HStack spacing={3}>
              <Button
                as={RouterLink}
                to="/login"
                colorScheme="whiteAlpha"
                size="sm"
              >
                Login
              </Button>
              <Button
                as={RouterLink}
                to="/register"
                colorScheme="teal"
                variant="solid"
                size="sm"
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
          width="25%"
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
                <Avatar size="sm" name={user.username} />
                <Text>Hello, {user.username}</Text>
                <Button onClick={logout} colorScheme="red" size="sm">
                  Logout
                </Button>
              </VStack>
            ) : (
              <VStack spacing={3}>
                <Button
                  as={RouterLink}
                  to="/login"
                  colorScheme="whiteAlpha"
                  size="sm"
                  w="full"
                >
                  Login
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  colorScheme="teal"
                  size="sm"
                  w="full"
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
