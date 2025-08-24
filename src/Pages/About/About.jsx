// import './About.css';
import { Box, Text, Stack } from "@chakra-ui/react";
import { useColorMode } from "../../components/ui/color-mode";
import { useColorModeValue } from "../../components/ui/color-mode";
import { Button } from "@chakra-ui/react/button";

export default function About() {
  const boxBg = useColorModeValue("teal.400", "teal.700");
  const buttonBg = useColorModeValue("teal.100", "teal.800");
  const txtColor = useColorModeValue("black", "white");
  const HoverBg = useColorModeValue("teal.200", "teal.600");
  const hoverColor = useColorModeValue("teal.700", "teal.100");

  return (
    <Box position="fixed" top="10%" left="0" w="100%">

      <Box bg={boxBg} position="fixed" top="20%" m={5} padding="2%" width="33%" rounded="md">
        <Text fontSize="xl">This is About Page ℹ️</Text>

        <Stack position="relative" top='20%' width="50%">
          <Button
            bg={buttonBg}
            color={txtColor}
            _hover={{ bg: HoverBg, color: hoverColor }}
            mt={20}>
            Contact Us
          </Button>
        </Stack>

      </Box>

    </Box>
  );
}
