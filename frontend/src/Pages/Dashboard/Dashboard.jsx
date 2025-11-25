import { useAuth } from "../../auth/useAuth";
import { Flex, Box, Heading, Text, Highlight, Button, Stack, HStack, Link, Card, Image } from "@chakra-ui/react";

// import { useAuth } from "../../auth/authContext";

import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user, loading } = useAuth();
  // const { user } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return (
    <Box mt={16} left="0" w="100%">

      <Flex gap="4"  mt={"5%"}>
        <Box  w={"33%"}> <Heading size="5xl">Dashboard</Heading></Box>
        <Box  w={"33%"}> </Box>
        <Box  w={"33%"}><Text mt={"1%"} textAlign="right">Welcome back, {user.username}!</Text> </Box>
      </Flex>

      <Box >
      <Heading mt={7} size="xl" fontWeight={"ml"}>Join any session of your interest!</Heading>
      </Box>
      
      <Box m={7} p={7}>

        <Card.Root maxW="sm" overflow="hidden" variant={"elevated"}>
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
      />
      <Card.Body gap="2">
        <Card.Title>Living room Sofa</Card.Title>
        <Card.Description>
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces.
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          $450
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid">Buy now</Button>
        <Button variant="ghost">Add to cart</Button>
      </Card.Footer>
    </Card.Root>

      </Box>


    </Box>
  );
}
