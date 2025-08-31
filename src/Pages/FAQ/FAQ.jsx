import React from "react";
import { Box, Heading, Text, Stack,Accordion,Button,Span } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../../components/ui/color-mode";


export default function FAQ() {
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
    <Box>
       
    <Box bg={boxBg} mt={20} ml="10%" p="2%" w={["85%", "80%", "60%", "80%"]} rounded="md" boxShadow="xl">
    <Heading color={hoverColor} size="5xl">
        Techadamy
       </Heading>
     <Accordion.Root multiple defaultValue={["b"]}>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={item.value}>
          <Accordion.ItemTrigger>
            <Span flex="1">{item.title}</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
    </Box>
    {/* next box */}
     <Box bg={boxBg} mt={20} ml="10%" p="2%" w={["85%", "80%", "60%", "80%"]} rounded="md" boxShadow="xl">
    <Heading color={hoverColor} size="5xl">
        Teaching
       </Heading>
     <Accordion.Root multiple defaultValue={["b"]}>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={item.value}>
          <Accordion.ItemTrigger>
            <Span flex="1">{item.title}</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
    </Box>
    
    </Box>
  )
}

const items = [
  { 
    value: "a", 
    title: "Q: What is Tecadamy?", 
    text: `
"A: Tecadamy is a collaborative learning platform where students connect
 to share knowledge with one another. It creates a space where every learner
  has the chance to become a teacher and every teacher can still be a learner."`
  },
  { value: "b", title: "Q: Who can use Tecadamy?", text: "A: Any student or learner who wants to grow by sharing and exchanging knowledge with peers." },
  { value: "c", title: "Q: Do I need formal teaching experience?", text:
    ` "Not at all! As long as you feel confident in a topic, 
    you can host a session and help others understand it better."` },
  {value: "d", title: "Q: How do I conduct a session?", text: "Some value 3..." },
  {value: "e", title: "Q: What are the benefits of teaching on Tecadamy?", text: "Individuals who conduct any lectures will earn Tokens based on the duration of their teaching. Additionally, teaching reinforces your own understanding, enhances confidence, and fosters communication abilities." },
  {value: "f", title: "Q: What are tokens in Tecadamy?", text: "Tokens act as a way to balance teaching and learning. By teaching, you earn tokens, and by learning from others, you spend them." },
  {value: "g", title: "Q: Why use tokens?", text: "Tokens encourage fairness and ensure that the platform runs on a give-and-take system — everyone contributes and everyone benefits." },
  {value: "h", title: "Q: Can tokens be transferred or exchanged outside Tecadamy?", text: "No. Tokens are designed only for use inside Tecadamy to keep the focus on knowledge exchange." },
  {value: "i", title: "Q: Ways to acquire tokens after completing all of them ", text: "Teaching , Watching ads , purchasing tokens from shop " },
  {value: "j", title: "Q: How do I join a session as a learner?", text: "When you search for a topic that you want to study, teachers from all around the world will be featured. Choose the one that sparks your curiosity." },
  {value: "k", title: "Q: Do I need to prepare anything before joining?", text: "Not necessarily, but it’s always helpful to review your doubts and questions beforehand to make the most of your learning time." },
  {value: "k", title: "Q: Can I learn multiple subjects at once?", text: "Yes! Tecadamy encourages multi-subject learning, so you can join as many sessions as you like, as long as you manage your time." },

]
