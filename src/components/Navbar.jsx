// import { Box, Flex, HStack, IconButton, Link, useDisclosure, Stack } from "@chakra-ui/react";
// import { Menu, X } from "lucide-react";
// import { Link as RouterLink } from "react-router-dom";

// const Links = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
// ];

// function NavLink({ to, children }) {
//     return (
//         <Link
//             as={RouterLink}
//             to={to}
//             px={3}
//             py={2}
//             rounded={"md"}
//             _hover={{ bg: "teal.700", color: "white" }}
//             _activeLink={{ bg: "teal.500", color: "white" }}
//             color="white"
//         >
//             {children}
//         </Link>
//     );
// }

// export default function MyNavbar() {
//     const { isOpen, onOpen, onClose } = useDisclosure();

//     return (
//         <Box bg="teal.600" px={4} color="white" position="fixed" top="0" left="0" w="100%" zIndex="1000">
//         <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
//                 {/* Brand / Logo */}
//                 <Box fontWeight="bold" color="white">
//                     Tecademy
//                 </Box>

//                 {/* Desktop Menu */}
//                 <HStack spacing={6} display={{ base: "none", md: "flex" }}>
//                     {Links.map((link) => (
//                         <NavLink key={link.name} to={link.path}>
//                             {link.name}
//                         </NavLink>
//                     ))}
//                 </HStack>

//                 {/* Hamburger button (mobile only) */}
//                 <IconButton
//                     size={"md"}
//                     icon={isOpen ? <X /> : <Menu />}
//                     aria-label={"Toggle Menu"}
//                     display={{ md: "none" }}
//                     onClick={isOpen ? onClose : onOpen}
//                     color="white"
//                     bg="teal.700"
//                     _hover={{ bg: "teal.500" }}
//                 />
//             </Flex>

//             {/* Mobile Menu (collapsible) */}
//             {isOpen ? (
//                 <Box pb={4} display={{ md: "none" }}>
//                     <Stack as={"nav"} spacing={4}>
//                         {Links.map((link) => (
//                             <NavLink key={link.name} to={link.path}>
//                                 {link.name}
//                             </NavLink>
//                         ))}
//                     </Stack>
//                 </Box>
//             ) : null}
//         </Box>
//     );
// }


// import { Box, Flex, HStack, IconButton, Link, useDisclosure, Stack } from "@chakra-ui/react";
// import { Menu, X } from "lucide-react";
// import { Link as RouterLink } from "react-router-dom";

// const Links = [
//   { name: "Home", path: "/" },
//   { name: "About", path: "/about" },
//   { name: "Contact", path: "/contact" },
// ];

// function NavLink({ to, children }) {
//   return (
//     <Link
//       as={RouterLink}
//       to={to}
//       px={3}
//       py={2}
//       rounded={"md"}
//       _hover={{ bg: "teal.700", color: "white" }}
//       _activeLink={{ bg: "teal.500", color: "white" }}
//       color="white"
//       display="block"  // makes links stack vertically
//     >
//       {children}
//     </Link>
//   );
// }

// export default function MyNavbar() {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <Box bg="teal.600" px={4} color="white" position="fixed" top="0" left="0" w="100%" zIndex="1000">
//       <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
//         {/* Brand / Logo */}
//         <Box fontWeight="bold" color="white">
//           Tecademy
//         </Box>

//         {/* Desktop Menu */}
//         <HStack spacing={6} display={{ base: "none", md: "flex" }}>
//           {Links.map((link) => (
//             <NavLink key={link.name} to={link.path}>
//               {link.name}
//             </NavLink>
//           ))}
//         </HStack>

//         {/* Hamburger button (mobile only) */}
//         <IconButton
//           size={"md"}
//           icon={isOpen ? <X /> : <Menu />}
//           aria-label={"Toggle Menu"}
//           display={{ md: "none" }}
//           onClick={isOpen ? onClose : onOpen}
//           color="white"
//           bg="teal.700"
//           _hover={{ bg: "teal.500" }}
//         />
//       </Flex>

//       {/* Mobile Menu (collapsible dropdown) */}
//       {isOpen && (
//         <Box
//           bg="teal.700"    // ✅ gives dropdown a background
//           p={4}
//           display={{ md: "none" }}
//           borderRadius="md"
//           mt={2}          // ✅ spacing from top navbar
//         >
//           <Stack as={"nav"} spacing={4}>
//             {Links.map((link) => (
//               <NavLink key={link.name} to={link.path}>
//                 {link.name}
//               </NavLink>
//             ))}
//           </Stack>
//         </Box>
//       )}
//     </Box>
//   );
// }


import { Box, Flex, HStack, IconButton, Link, useDisclosure, Stack } from "@chakra-ui/react";
import { Menu, X } from "lucide-react";   // using Lucide icons
import { Link as RouterLink } from "react-router-dom";

const Links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function NavLink({ to, children }) {
  return (
    <Link
      as={RouterLink}
      to={to}
      px={3}
      py={2}
      rounded={"md"}
      _hover={{ bg: "teal.700", color: "white" }}
      _activeLink={{ bg: "teal.500", color: "white" }}
      color="white"
      display="block"
    >
      {children}
    </Link>
  );
}

export default function MyNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="teal.600" px={4} color="white" position="fixed" top="0" left="0" w="100%" zIndex="1000">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        {/* Brand / Logo */}
        <Box fontWeight="bold" color="white">
          Tecademy
        </Box>

        {/* Desktop Menu */}
        <HStack spacing={6} display={{ base: "none", md: "flex" }}>
          {Links.map((link) => (
            <NavLink key={link.name} to={link.path}>
              {link.name}
            </NavLink>
          ))}
        </HStack>

        {/* Hamburger (mobile only) */}
        <IconButton
          size="md"
          icon={isOpen ? <X /> : <Menu />}
          aria-label="Toggle Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          color="white"
          bg="teal.700"
          _hover={{ bg: "teal.500" }}
        />
      </Flex>

      {/* Mobile Dropdown */}
      {isOpen && (
        <Box
          bg="teal.700"
          p={4}
          display={{ md: "none" }}
          borderRadius="md"
          mt={2}
        >
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
