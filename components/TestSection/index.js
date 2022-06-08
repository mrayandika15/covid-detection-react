import { Box, Button, Checkbox, Flex, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { BiArrowBack } from "react-icons/bi";

import { IoClipboardOutline } from "react-icons/io5";

import { dataAnswer } from "./DataAnswer";
import { ResultAnswer } from "./ResultAnswer";
import { WelcomeModal } from "./welcomeModal";

import { database } from "../../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { fetchUserDetail } from "../../utils/fetchUserDetail";
import { AnimatePresence, motion } from "framer-motion";

const TestSection = () => {
  const [testActive, setTestActive] = useState(false);

  const [userDetail, setUserDetail] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [resultActive, SetResultActive] = useState(false);

  const [positive, setPositive] = useState(false);

  const [answer, setAnswer] = useState(dataAnswer);

  const dbInstance = collection(database, "result");

  useEffect(() => {
    const userResource = fetchUserDetail();

    setUserDetail(userResource[0]);
  }, []);

  const submitHandler = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(true);
      SetResultActive(true);
      setTestActive(false);
      setIsLoading(false);
    }, 2000);

    if (
      answer[0].checkedItems === true &&
      answer[2].checkedItems === true &&
      answer[3].checkedItems === true
    ) {
      setPositive(true);
      addDoc(dbInstance, {
        result: true,
        user: userDetail.uid,
        date: new Date(),
      });
    } else {
      setPositive(false);
      addDoc(dbInstance, {
        result: false,
        user: userDetail.uid,
        date: new Date(),
      });
    }
  };

  return (
    <Flex w="full" h="full" justify="center" alignItems="center">
      {!testActive && !resultActive && (
        <AnimatePresence>
          <Flex
            as={motion.div}
            exit={{ opacity: 0, translateY: -20 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, translateY: 20 }}
          >
            <WelcomeModal setTestActive={(value) => setTestActive(value)} />
          </Flex>
        </AnimatePresence>
      )}

      {testActive && (
        <AnimatePresence>
          <Box
            w="750px"
            h="450px"
            border="gray"
            shadow="md"
            bg="white"
            rounded="md"
            mb="200px"
            px="10px"
            display="flex"
            flexDirection="column"
            as={motion.div}
            exit={{ opacity: 0, translateY: -20 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, translateY: 20 }}
          >
            <Flex w="full" h="fit-content" py="15px">
              <Button
                leftIcon={<BiArrowBack />}
                rounded="md"
                onClick={() => setTestActive(false)}
              >
                Back
              </Button>
            </Flex>

            <Flex w="full" justify="center" mt="20px">
              <Text fontSize="3xl">What do you feel ?</Text>
            </Flex>

            <Flex
              w="full"
              px="50px"
              h="170px"
              flexWrap="wrap"
              justify="center"
              mt="15px"
            >
              {answer.map((item, index) => (
                <Checkbox
                  colorScheme="green"
                  size="lg"
                  w="50%"
                  h="45px"
                  key={index}
                  isChecked={item?.checkedItems}
                  onChange={(e) => {
                    e.preventDefault();
                    item.checkedItems = e.target.checked;
                    setAnswer([...answer]);
                  }}
                >
                  <Text fontSize="2xl">{item.question}</Text>
                </Checkbox>
              ))}
            </Flex>

            <Flex w="full" justify="center" mt="40px">
              <Button
                size="lg"
                leftIcon={<IoClipboardOutline />}
                bgColor="red.400"
                color="white"
                onClick={submitHandler}
                isLoading={isLoading ? true : false}
                loadingText="Submiting..."
              >
                Submit
              </Button>
            </Flex>
          </Box>
        </AnimatePresence>
      )}

      {resultActive ? (
        <AnimatePresence>
          <Flex
            as={motion.div}
            exit={{ opacity: 0, translateY: -20 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, translateY: 20 }}
          >
            <ResultAnswer
              SetResultActive={(value) => SetResultActive(value)}
              setTestActive={(value) => setTestActive(value)}
              positive={positive}
            />
          </Flex>
        </AnimatePresence>
      ) : null}
    </Flex>
  );
};

export default TestSection;
