import { Box, Button } from "@chakra-ui/react";

import { IoReaderSharp, IoPencil, IoPodium, IoBusiness } from "react-icons/io5";

import { useState, useEffect } from "react";

import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const routerPathname = router.pathname;

  const [isOpen, setIsOpen] = useState({
    takeTest: false,
    covidArea: false,
    listHospital: false,
    testHistory: false,
  });

  useEffect(() => {
    if (routerPathname === "/take-test") {
      setIsOpen({ takeTest: true });
    }
    if (routerPathname === "/covid-area") {
      setIsOpen({ covidArea: true });
    }
    if (routerPathname === "/list-hospital") {
      setIsOpen({ listHospital: true });
    }
    if (routerPathname === "/test-history") {
      setIsOpen({ testHistory: true });
    }
  }, []);

  return (
    <Box
      w="25%"
      h="100vh"
      zIndex="base"
      bg="white"
      alignItems="center"
      display="flex"
      gap="20px"
      flexDirection="column"
    >
      <Button
        variant="sidebar-button"
        leftIcon={<IoPencil />}
        onClick={() => router.push("/take-test")}
        isActive={isOpen.takeTest}
      >
        Take The Test
      </Button>
      <Button
        variant="sidebar-button"
        leftIcon={<IoPodium />}
        onClick={() => router.push("/covid-area")}
        isActive={isOpen.covidArea}
      >
        Covid Statistic
      </Button>

      <Button
        variant="sidebar-button"
        leftIcon={<IoReaderSharp />}
        onClick={() => router.push("/test-history")}
        isActive={isOpen.testHistory}
      >
        Test History
      </Button>
    </Box>
  );
};

export default Sidebar;
