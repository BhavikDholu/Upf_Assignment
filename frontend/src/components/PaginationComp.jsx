import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

function PaginationComp(props) {
    const {page,handlePage} = props;
  return (
    <Flex>
      <Button onClick={() => handlePage(page - 1)}>
        <ArrowLeftIcon />
      </Button>
      <Button>{page}</Button>
      <Button onClick={() => handlePage(page - 1)}>
        <ArrowRightIcon />
      </Button>
    </Flex>
  );
}

export default PaginationComp