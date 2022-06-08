import { Button, Flex } from "@chakra-ui/react";
import React from "react";

import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";

import { usePagination, DOTS } from "./usePagination";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <Flex gap="12px">
      {/* Left navigation arrow */}
      <Button
        size="sm"
        rounded="lg"
        leftIcon={<IoArrowBack />}
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <p>&#8230;</p>;
        }

        // Render our Page Pills
        return (
          <Button
            size="sm"
            onClick={() => onPageChange(pageNumber)}
            isActive={pageNumber === currentPage}
            key={pageNumber}
          >
            {pageNumber}
          </Button>
        );
      })}
      {/*  Right Navigation arrow */}
      <Button
        size="sm"
        rightIcon={<IoArrowForwardSharp />}
        onClick={onNext}
        disabled={currentPage === lastPage}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
