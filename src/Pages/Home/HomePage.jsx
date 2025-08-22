import { Box, Text, Button, Stack } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../../components/ui/color-mode";

export default function HomePage() {
  const homeBg = useColorModeValue("teal.400", "teal.700");
  const dropdownBg = useColorModeValue("teal.100", "teal.800");
  const homeColor = useColorModeValue("black", "white");

  return (
    <Box  position="fixed" top="10%" left="0" w="100%">

      <Box bg={homeBg} position="fixed" top="20%" m={5} padding="2%" width="33%" rounded="md">
        <Text  fontSize="xl">This is HomePage 🏠</Text>

        <Stack position="relative" top='20%' width="50%">
          <Button bg={dropdownBg} color={homeColor}  mt={20}>Login</Button>
          <Button mt={4}>Sign up</Button>
        </Stack>
      </Box>

    </Box>
  );
}
