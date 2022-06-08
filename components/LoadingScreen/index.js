import { Box, Spinner } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Box
      zIndex="modal"
      position="fixed"
      w="100vw"
      h="100vh"
      bg="red.200"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="xl" thickness="4px" speed="0.65s" color="white" />
    </Box>
  );
};

export default LoadingScreen;
