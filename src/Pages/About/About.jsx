// import './About.css';
import { Box, Text, Heading, Stack } from "@chakra-ui/react";
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
    <Box display="flex"
      alignItems="center"
      justifyContent="center" w="100%">

      <Box bg={boxBg}
        mt={"125px"}
        ml={"2.5%"}
        mr={"2.5%"}
        p={"2%"}
        pt={"5%"}
        w={["85%", "80%", "75%", "90%"]}
        rounded="md">

        <Heading fontSize="4xl">About Us </Heading>

        

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
