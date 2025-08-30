import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function FAQ() {
  return (
    <Box p={6}>
      <Heading as="h1" size="xl" color="teal.600" mb={4}>
        Tecadamy Docs
      </Heading>
      <Text fontSize="lg" mb={2}>
        Earn tokens by teaching subjects you are confident in.
      </Text>
      <Text fontSize="lg" mb={2}>
        Spend tokens to learn from peers on topics you find challenging.
      </Text>
      <Text fontSize="lg">
        This cycle ensures that everyone has the chance to be both a teacher and a learner.
      </Text>
    </Box>
  );
};


