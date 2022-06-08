import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Td,
  Flex,
  Spinner,
} from "@chakra-ui/react";

import { motion } from "framer-motion";

import { useState, useEffect, useMemo } from "react";
import Pagination from "./Pagination";

const TableStatistic = ({
  resource,
  isLoading,
  searcActive,
  searchResult,
  isDataLoading,
}) => {
  let PageSize = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return resource.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <TableContainer
        bgColor="white"
        rounded="2xl"
        p="10px"
        w="full"
        h="250px"
        overflowY="scroll"
      >
        <Table>
          <TableCaption>
            <h1>Covid-19 Statistics</h1>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Country</Th>
              <Th>Cases</Th>
              <Th>Deaths</Th>
              <Th>Recovered</Th>
            </Tr>
          </Thead>

          {isLoading ? (
            <Tbody>
              <Td colSpan="4" textAlign="center">
                <Spinner color="red" size="lg" />
              </Td>
            </Tbody>
          ) : (
            !isLoading &&
            !searcActive &&
            !isDataLoading && (
              <Tbody
                as={motion.tbody}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {currentTableData.map((post) => {
                  return (
                    <Tr key={post.id}>
                      <Td>{post.country}</Td>
                      <Td color="red.400">{numberWithCommas(post.cases)}</Td>
                      <Td color="red">{numberWithCommas(post.deaths)}</Td>
                      <Td color="green.400">
                        {numberWithCommas(post.recovered)}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            )
          )}

          {isDataLoading && (
            <Tbody>
              <Td colSpan="4" textAlign="center">
                <Spinner color="red" size="lg" />
              </Td>
            </Tbody>
          )}

          {searcActive && !isLoading && !isDataLoading && (
            <Tr>
              <Td>{searchResult?.country}</Td>
              <Td color="red.400">{numberWithCommas(searchResult?.cases)}</Td>
              <Td color="red">{numberWithCommas(searchResult?.deaths)}</Td>
              <Td color="green.400">
                {numberWithCommas(searchResult?.recovered)}
              </Td>
            </Tr>
          )}
        </Table>
      </TableContainer>
      <Flex w="full">
        <Pagination
          currentPage={currentPage}
          totalCount={resource.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Flex>
    </>
  );
};

export default TableStatistic;
