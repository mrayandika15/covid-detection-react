import { Box } from "@chakra-ui/react";

const Card = ({ children }) => {
  return (
    <Box
      w="350px"
      h="130px"
      border="gray"
      shadow="md"
      bg="white"
      rounded="md"
      p="15px"
      display="flex"
      justify="center"
      items="center"
    >
      {children}
    </Box>
  );
};

export default Card;
