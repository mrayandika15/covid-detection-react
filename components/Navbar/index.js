import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { IoExitOutline } from "react-icons/io5";
import Router from "next/router";

const Navbar = ({ isLoading, userDetail }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const signoutHandler = async () => {
    localStorage.clear;
    Router.push("/").then(() => {
      toast({
        title: "Account Sign-out.",
        description: "Please Comeback later :)",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    });
  };

  return (
    <Box
      h="100px"
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px="5"
      zIndex="dropdown"
      position="fixed"
      bgColor="white"
    >
      <Text fontWeight="bold" color="red.400" fontSize="3xl">
        Covid-19 Diagnostic
      </Text>
      {isLoading ? (
        <Spinner size="lg" color="red.400" />
      ) : (
        <Avatar
          name={userDetail?.displayName}
          src={userDetail?.photoURL}
          size="md"
          cursor="pointer"
          onClick={onOpen}
        />
      )}

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="10px"
          >
            <Avatar
              name={userDetail?.displayName}
              src={userDetail?.photoURL}
              size="md"
            />
            <VStack>
              <Text fontSize="lg">{userDetail?.displayName}</Text>
              <Text fontSize="small" fontWeight="normal">
                {userDetail?.email}
              </Text>
            </VStack>
          </DrawerHeader>
          <DrawerBody>
            <Button
              w="full"
              leftIcon={<IoExitOutline />}
              onClick={signoutHandler}
              isLoading={isLoading ? true : false}
              loadingText="Signing out..."
            >
              Sign-out
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
