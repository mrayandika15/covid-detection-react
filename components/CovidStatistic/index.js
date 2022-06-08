import {
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Spinner,
  Stack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tab,
} from "@chakra-ui/react";

import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";

import Card from "../Card";
import TableStatistic from "../TableStatistic";
import { motion } from "framer-motion";
import axios from "axios";

const CovidStatistic = ({ resource }) => {
  const [isLoading, setisLoading] = useState(false);

  const [isDataLoading, setIsDataLoading] = useState(false);

  const [searchResult, setSearchResult] = useState({});

  const [searcActive, setSearchActive] = useState(false);

  const [search, setSearch] = useState(" ");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsDataLoading(true);

      setSearchActive(true);

      if (search === "") {
        setSearchActive(false);
      }
      axios
        .get("https://coronavirus-19-api.herokuapp.com/countries/" + search)
        .then((res) => {
          setSearchResult(res.data);
          setIsDataLoading(false);
        });
    }
  };

  useEffect(() => {
    setisLoading(true);

    setTimeout(() => {
      setisLoading(false);
    }, 2000);
  }, []);

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Flex gap="45px" w="full" flexDirection="column" align="center" px="10px">
      <Flex gap="12px" justify="center" w="full">
        <Card type="small">
          <Stat>
            <StatLabel fontSize="md">Total Cases</StatLabel>
            {isLoading ? (
              <Spinner mt="15px" color="red" size="lg" />
            ) : (
              <Stack
                as={motion.div}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <StatNumber fontSize="3xl" color="red.400">
                  {numberWithCommas(resource[0]?.cases)}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  {numberWithCommas(resource[0]?.todayCases)}
                </StatHelpText>
              </Stack>
            )}
          </Stat>
        </Card>

        <Card type="small">
          <Stat>
            <StatLabel fontSize="md">Total Death</StatLabel>
            {isLoading ? (
              <Spinner mt="15px" color="red" size="lg" />
            ) : (
              <Stack
                as={motion.div}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <StatNumber fontSize="3xl" color="red">
                  {numberWithCommas(resource[0]?.deaths)}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  {numberWithCommas(resource[0]?.todayDeaths)}
                </StatHelpText>
              </Stack>
            )}
          </Stat>
        </Card>

        <Card type="small">
          <Stat>
            <StatLabel fontSize="md">Recovered</StatLabel>

            {isLoading ? (
              <Spinner mt="15px" color="red" size="lg" />
            ) : (
              <StatNumber
                fontSize="3xl"
                color="green"
                as={motion.div}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {numberWithCommas(resource[0]?.recovered)}
              </StatNumber>
            )}
          </Stat>
        </Card>
      </Flex>

      <Flex w="full" px="25px">
        <InputGroup>
          <Input
            type="text"
            placeholder="Search country"
            bg="white"
            onInput={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          ></Input>
          <InputRightAddon>
            <BsSearch />
          </InputRightAddon>
        </InputGroup>
      </Flex>

      <TableStatistic
        resource={resource}
        isLoading={isLoading}
        searcActive={searcActive}
        searchResult={searchResult}
        isDataLoading={isDataLoading}
      />
    </Flex>
  );
};

export default CovidStatistic;
