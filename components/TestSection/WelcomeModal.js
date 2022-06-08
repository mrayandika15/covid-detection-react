import React from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

export const WelcomeModal = ({ setTestActive }) => {
  return (
    <Box
      w="fit-content"
      h="fit-content"
      border="gray"
      shadow="md"
      bg="white"
      rounded="md"
      p="85px"
      mb="200px"
    >
      <Flex
        w="full"
        h="full"
        justify="center"
        alignItems="center"
        direction="column"
        gap="15px"
      >
        <Flex fontSize="4xl" fontWeight="bold" gap="4px">
          Start <Text color="red.300">Covid 19 Test</Text>
        </Flex>
        <Button size="lg" onClick={() => setTestActive(true)}>
          Take a test
        </Button>
      </Flex>
    </Box>
  );
};
