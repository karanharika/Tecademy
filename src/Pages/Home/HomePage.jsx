import { Box, Heading, Text, Highlight, Button, Stack } from "@chakra-ui/react";
import { Ghost } from "lucide-react";
import { useColorMode, useColorModeValue } from "../../components/ui/color-mode";

export default function HomePage() {
  const boxBg = useColorModeValue("teal.400", "teal.800");
  const buttonBg = useColorModeValue("teal.100", "teal.700");
  const txtColor = useColorModeValue("black", "white");
  const HoverBg = useColorModeValue("teal.200", "teal.600");
  const hoverColor = useColorModeValue("teal.700", "teal.200");
  const highlightColor = useColorModeValue("pink.800", "pink.300");
  const altButtonBg = useColorModeValue("teal.800", "teal.100");
  const altTxtColor = useColorModeValue("white", "black");
  const altHoverBg = useColorModeValue("teal.900", "teal.200");
  const altHoverColor = useColorModeValue("teal.200", "teal.700");

  return (
    <Box mt={16} left="0" w="100%">

      <Box mt={10} ml="5%" p="2%" w={["85%", "80%", "60%", "95%"]} rounded="md" >
        <Heading color={hoverColor} size="5xl">
          <Highlight query="TecaTokens" styles={{ color: highlightColor }}>
            Learn, Teach, and Grow — Powered by TecaTokens
          </Highlight>


        </Heading>
        <Text fontSize="2xl" color="fg.muted" w={["100%", "100%", "100%", "95%"]}>
          Tecademy is a peer-to-peer tutoring platform where students exchange knowledge
          through tokens. Teach to earn, spend to learn — a community built on shared growth.
        </Text>
      </Box>

      <Box bg={boxBg} mt={7} ml="10%" p="2%" w={["85%", "80%", "60%", "40%"]} rounded="md" boxShadow="xl">
        <Text fontSize="xl">This is HomePage 🏠</Text>

        <Stack w="50%">
        <Button bg={altButtonBg} color={altTxtColor}
            _hover={{ bg: altHoverBg, color: altHoverColor }}
         mt={16} >Sign up</Button>

          <Button bg={buttonBg} color={txtColor}
            _hover={{ bg: HoverBg, color: hoverColor }}
           mt={4} >Login</Button>


        </Stack>
      </Box>

      <Box bg={boxBg} mt={10} ml="10%" p="2%" w={["85%", "80%", "60%", "40%"]} rounded="md">
        <Text fontSize="xl">This is HomePage 🏠</Text>

        <Stack position="relative" top='20%' w="50%">
          <Button bg={buttonBg} color={txtColor}
            _hover={{ bg: HoverBg, color: hoverColor }}
            mt={20}>Login</Button>

          <Button mt={4}>Sign up</Button>
        </Stack>
      </Box>

      <Box bg={boxBg} mt={10} ml="10%" p="2%" w={["85%", "80%", "60%", "40%"]} rounded="md">
        <Text fontSize="xl">This is HomePage 🏠</Text>

        <Stack position="relative" top='20%' w="50%">
          <Button bg={buttonBg} color={txtColor}
            _hover={{ bg: HoverBg, color: hoverColor }}
            mt={20}>Login</Button>

          <Button mt={4}>Sign up</Button>
        </Stack>
      </Box>

    </Box>
  );
}
