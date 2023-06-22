import { Avatar, Box, Button, Flex, Heading, Input, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Table, TableContainer, Tbody, Td, Th, Thead, Tr,useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { DragHandleIcon, ChevronDownIcon, ViewIcon, ExternalLinkIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from 'react-router-dom';
import PaginationComp from '../components/PaginationComp';

function Dashboard() {
    const [data,setData] = useState([]);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [search,setSearch] = useState("");
    const toast = useToast();

    const navigate = useNavigate();

    const handleSearchInp = (e)=>{
        const {value} = e.target;
        setSearch(value);
    }

    const handleSearch = async()=>{
        setLoading(true);
        try {
          let res = await fetch(`${process.env.REACT_APP_BASE_URL}/search`, {
            method: "POST",
            body: JSON.stringify({ name: search }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          let detail = await res.json();
          if(detail.length===0){
            toast({
              title: 'User Not Found',
              status: 'info',
              duration: 3000,
              isClosable: true,
              position: "top",
            });
          }else{
              setData(detail);
          }
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError(true);
        }
    }

    const handleStatus = async(val,id)=>{
        setLoading(true);
        try {
          let res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/update/status/${id}`,
            {
              method: "PATCH",
              body: JSON.stringify({ status: val }),
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
          let { msg,status } = await res.json();
          toast({
            title: msg,
            status: status,
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          getDetails();
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError(true);
        }
    }

    const handldeDelete = async(id)=>{
        setLoading(true);
        try {
          let res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/remove/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          let { msg, status } = await res.json();
          toast({
            title: msg,
            status: status,
            duration: 3000,
            isClosable: true,
            position: 'top'
          });
          getDetails();
        } catch (error) {
          console.log(error);
          setLoading(false);
          setError(true);
        }
    }

    const getDetails = async()=>{
        setLoading(true);
        try {
            let res = await fetch(process.env.REACT_APP_BASE_URL);
            let {details} = await res.json();
            setData(details);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }

    const handleCsvfile = async()=>{
        setLoading(true);
        try {
            let res = await fetch(`${process.env.REACT_APP_BASE_UR}/export/csv`);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }

    const handlePage = (num)=>{
        if(num>0){
            setPage(num)
        }
    }

    useEffect(()=>{
        getDetails()
    },[])
  return (
    <Box w="90%" margin={"auto"} mt="20px">
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 2 }}
        margin="auto"
        spacing={{ base: 10, sm: 10, md: 40, lg: 60 }}
      >
        <Flex gap={6}>
          <Input
            placeholder="Search by first name"
            size="md"
            onChange={handleSearchInp}
          />
          <Button colorScheme="red" size="md" onClick={handleSearch}>
            Search
          </Button>
        </Flex>
        <Flex gap={6}>
          <Button
            colorScheme="red"
            size="md"
            onClick={() => navigate("/user/add")}
          >
            + Add User
          </Button>
          <Button colorScheme="red" size="md" onClick={handleCsvfile}>
            Export To Csv
          </Button>
        </Flex>
      </SimpleGrid>
      {loading && <Heading>Loading...</Heading>}
      <Box w="90%" margin="auto" mt="50px" boxShadow="md" rounded="md">
        <TableContainer>
          <Table variant="simple">
            <Thead bg="black.500">
              <Tr>
                <Th>ID</Th>
                <Th>FullName</Th>
                <Th>Email</Th>
                <Th>Gender</Th>
                <Th>Status</Th>
                <Th>Profile</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((ele) => (
                <Tr key={ele._id}>
                  <Td>{ele._id}</Td>
                  <Td>
                    {ele.firstName} {ele.lastName}
                  </Td>
                  <Td>{ele.email}</Td>
                  <Td>{ele.gender}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={Button}
                        colorScheme="red"
                        rightIcon={<ChevronDownIcon />}
                      >
                        {ele.status ? "Active" : "InActive"}
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => handleStatus(true, ele._id)}>
                          Active
                        </MenuItem>
                        <MenuItem onClick={() => handleStatus(false, ele._id)}>
                          InActive
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                  <Td>
                    <Avatar bg="teal.500" />
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton>
                        <DragHandleIcon />
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          onClick={() => navigate(`/user/detail/${ele._id}`)}
                        >
                          <ViewIcon /> View
                        </MenuItem>
                        <MenuItem
                          onClick={() => navigate(`/user/edit/${ele._id}`)}
                        >
                          <ExternalLinkIcon /> Edit
                        </MenuItem>
                        <MenuItem onClick={() => handldeDelete(ele._id)}>
                          <DeleteIcon />
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Box>
          <PaginationComp page={page} handlePage={handlePage} />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard