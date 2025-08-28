// import './About.css';
import { Box, Text, Heading, Stack, List } from "@chakra-ui/react";
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

        <Text mt= {12} textStyle="xl" color = {txtColor}> 

          At Tecadamy, we believe knowledge grows best when it’s shared.
           Our platform empowers students to learn from each other through a unique token-based knowledge exchange system.
        
           Here’s how it works:
        
      <List.Root mt ={6} > 
        <List.Item _marker={{ color: {base: "teal.800", _dark: "teal.300"}  }}> 
           Students earn Tecadamy Tokens by teaching subjects they are confident in.
        </List.Item>
        <List.Item _marker={{ color: {base: "teal.800", _dark: "teal.300"}  }}>
          These tokens can then be used to buy learning sessions from peers on topics they find challenging.
        </List.Item>
        <List.Item _marker={{ color: {base: "teal.800", _dark: "teal.300"}  }}> 
          This cycle ensures that everyone has the chance to be both a teacher and a learner.
        </List.Item>
      </List.Root>   
<br></br>
We aim to create a collaborative learning ecosystem where education is not limited by traditional barriers. 
With Tecadamy, students can strengthen their skills, overcome weaknesses, and build confidence — all while helping each other succeed.
<br></br><br></br>


  </Text>
      <Heading fontSize="4xl">Our Vision </Heading>

  <Text mt= {9} textStyle="xl" color = {txtColor} textAlign = "justify">

Our vision is to transform the way students learn and grow by building a global community where knowledge is freely exchanged, skills are sharpened, and curiosity never stops.
 We dream of a world where learning is not confined to classrooms or textbooks but flows naturally between students who support one another.
 Through Tecadamy, we envision creating an environment where every learner feels empowered to teach, inspired to learn, and motivated to grow.
  By redefining education as a shared journey, our vision is to make knowledge more accessible, interactive, and meaningful, while ensuring that no student is left behind in the pursuit of understanding.
  </Text>
  <br></br><br></br>

  <Heading fontSize="4xl"> Mission </Heading>

  <Text mt= {9} textStyle="xl" color = {txtColor} textAlign="justify" >

Our mission is to redefine peer-to-peer education by designing a platform where students can both share their expertise and seek guidance in areas where they struggle. We are committed to fostering a culture where teaching is recognized, learning is rewarding, and collaboration is celebrated.

Through the Tecadamy Token system, we aim to create a self-sustaining knowledge economy where students are fairly rewarded for their time and effort. By turning every student into both a learner and a teacher, we strive to break down barriers of doubt, encourage confidence, and promote lifelong learning.

At Tecadamy, our mission goes beyond academics. We want to build a community that values teamwork, mutual growth, and the belief that everyone has something valuable to contribute. By empowering students to take charge of their learning journeys, we aim to shape a future where education is not just about grades, but about skills, collaboration, and growth.
  </Text>

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
