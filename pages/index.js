import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { firebaseApp } from "../services/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const toast = useToast();

  const firebaseAuth = getAuth(firebaseApp);

  const provider = new GoogleAuthProvider();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const buttonHandler = async () => {
    setIsLoading(true);

    const { user } = await signInWithPopup(firebaseAuth, provider);

    const { refreshToken, providerData } = user;

    localStorage.setItem("user", JSON.stringify(providerData));

    localStorage.setItem("accessToken", JSON.stringify(refreshToken));

    router.push("/take-test");

    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setIsLoading(false);
  };

  return (
    <Flex
      w="full"
      h="100vh"
      justify={"center"}
      align="center"
      bgColor="gray.50"
      flexDirection="column"
      gap="5"
    >
      <Flex fontSize="5xl" fontWeight="bold" display="flex" gap="3">
        Welcome to
        <Text color="red.400"> Covid-19 Diagnostic</Text>
      </Flex>
      <Button
        size="lg"
        colorScheme="gray"
        leftIcon={<FcGoogle />}
        onClick={buttonHandler}
        isLoading={isLoading ? true : false}
        loadingText="Managing Your Account..."
      >
        Sign-in with google
      </Button>
    </Flex>
  );
}
