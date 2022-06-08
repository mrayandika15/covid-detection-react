import {
  Avatar,
  Box,
  Flex,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchUserDetail } from "../../utils/fetchUserDetail";

import { database } from "../../services/firebase";

import { collection, getDocs } from "firebase/firestore";

import { motion } from "framer-motion";

const TestHistorySection = () => {
  const [userDetail, setUserDetail] = useState({});

  const [allResultCovid, setAllResultCovid] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const dbInstance = collection(database, "result");

  const toast = useToast();

  const filterByUserId = allResultCovid.filter(
    (item) => item.user === userDetail.uid
  );

  const getData = () => {
    getDocs(dbInstance).then((data) => {
      setAllResultCovid(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);

    const userResource = fetchUserDetail();
    setUserDetail(userResource[0]);
    getData();
  }, []);

  return (
    <Box
      w="1100px"
      h="650px"
      border="gray"
      rounded="md"
      mb="200px"
      px="10px"
      display="flex"
      flexDirection="column"
    >
      <Flex w="full" h="fit-content" justify="center" mt="15px">
        <Avatar
          name={userDetail?.displayName}
          src={userDetail?.photoURL}
          size="2xl"
        />
      </Flex>
      <Flex
        w="full"
        justify="center"
        mt="25px"
        flexDirection="column"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="semibold" color="gray.700">
          {userDetail?.displayName}
        </Text>

        <Text fontsize="sm">{userDetail?.email}</Text>

        <Text fontSize="4xl" fontWeight="bold">
          History
        </Text>
      </Flex>

      <Flex
        direction="row"
        flexWrap="wrap"
        w="full"
        px="25px"
        mt="30px"
        gap="15px"
        overflowY="scroll"
      >
        {isLoading ? (
          <Spinner color="red" size="lg" />
        ) : (
          filterByUserId?.map((item, index) => {
            console.log(item.result);

            return (
              <Box
                w="220px"
                h="120px"
                p="10px"
                shadow="md"
                bg="white"
                display="flex"
                justify="center"
                alignItems="center"
                key={index}
                as={motion.div}
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, translateY: -20 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, translateY: 20 }}
              >
                <Stat>
                  <StatLabel>Result</StatLabel>
                  {item?.result === true ? (
                    <StatNumber color="red.400">Positive</StatNumber>
                  ) : (
                    <StatNumber color="green.400">Negative</StatNumber>
                  )}

                  <StatHelpText>
                    {item?.date.toDate().toDateString()}
                  </StatHelpText>
                </Stat>
              </Box>
            );
          })
        )}
      </Flex>
    </Box>
  );
};

export default TestHistorySection;
