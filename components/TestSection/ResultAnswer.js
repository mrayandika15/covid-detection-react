import {
  Box,
  Flex,
  Button,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

import { ImLoop2 } from "react-icons/im";

export const ResultAnswer = ({ SetResultActive, setTestActive, positive }) => {
  return (
    <Box
      w="550px"
      h="450px"
      border="gray"
      shadow="md"
      bg="white"
      rounded="md"
      mb="200px"
      px="10px"
      display="flex"
      flexDirection="column"
    >
      <Flex w="full" h="fit-content" justify="center" mt="30px">
        <Text fontSize="xl" fontWeight="semibold" color="gray.600">
          Result
        </Text>
      </Flex>

      <Flex
        w="full"
        h="full"
        flexDirection="column"
        alignItems="center"
        pt="25px"
        gap="10px"
      >
        {positive ? (
          <Text fontSize="5xl" fontWeight="bold" color="red.400">
            POSITIVE
          </Text>
        ) : (
          <Text fontSize="5xl" fontWeight="bold" color="green.400">
            NEGATIVE
          </Text>
        )}

        <TableContainer>
          <Table variant="simple">
            <TableCaption>Suggestion for your health</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign="center">symptom</Th>
                <Th textAlign="center">suggestion</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td> {positive ? "covid 19" : "common fever"}</Td>
                <Td>
                  {positive
                    ? "recommended to hospital"
                    : "consultation with a doctor"}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Flex w="full" h="fit-content" justify="center" pt="12px">
          <Button
            leftIcon={<ImLoop2 />}
            bgColor="green.400"
            color="white"
            _hover={{ color: "green.600", bgColor: "gray.200" }}
            onClick={() => {
              SetResultActive(false);
              setTestActive(false);
            }}
          >
            Test Again
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
