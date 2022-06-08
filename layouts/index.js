import { Flex } from "@chakra-ui/react";
import { Navbar, Sidebar } from "../components";
import * as React from "react";
import Router from "next/router";
import { fetchUserDetail, userAccessToken } from "../utils/fetchUserDetail";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const accessToken = userAccessToken();

    if (!accessToken) return Router.push("/");

    const userDetail = fetchUserDetail();

    setUser(userDetail[0]);

    const handleStart = (url) => url !== Router.asPath && setIsLoading(true);
    const handleComplete = (url) =>
      url === Router.asPath && setIsLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <Flex
      w="full"
      h="100vh"
      bgColor="gray.50"
      flexDirection="column"
      overflow="hidden"
    >
      <Navbar isLoading={isLoading} userDetail={user} />
      <Flex pt="100px" gap="20px">
        <Sidebar />
        <Flex
          mt="20px"
          w="full"
          h="full"
          as={motion.div}
          exit={{ opacity: 0, translateY: -20 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, translateY: 20 }}
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
