import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initDetail = {
  firstName : "",
  lastName : "",
  email : "",
  mobile : "",
  gender : "",
  status : "",
  profile : "",
  location : ""
}

function RegisterUser() {

const [detail,setDetail] = useState(initDetail);
const toast = useToast();
const navigate = useNavigate()

const handleChange = (e)=>{
  
   const {name,value} = e.target;
   setDetail({...detail,[name]:value});
}

const handleSubmit = async() =>{
  
  try {
    let res = await fetch(`${process.env.REACT_APP_BASE_URL}/add`, {
      method: "POST",
      body: JSON.stringify(detail),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let {msg,status} = await res.json();
    toast({
      title: msg,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    if(status === 'success'){
      navigate("/");
    }
  } catch (error) {
    console.log(error)
    toast({
      title: 'Somthing went wrong',
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }
}

const {firstName,lastName,email,mobile,gender,status,profile,location} = detail;

  return (
    <Flex align={"center"} justify={"center"} boxShadow="md" rounded="md">
      <Stack spacing={8}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Register Your Details
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Mobile</FormLabel>
                  <Input
                    type="text"
                    name="mobile"
                    value={mobile}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Select Your Gender</FormLabel>
                  <Select
                    placeholder="Select option"
                    type="text"
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                    w="100%"
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel>Select Your Status</FormLabel>
                  <Select
                    placeholder="Select option"
                    type="text"
                    name="status"
                    value={status}
                    onChange={handleChange}
                    w="100%"
                  >
                    <option value="true">Active</option>
                    <option value="false">InActive</option>
                  </Select>
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Select Your Profile</FormLabel>
                  <Input
                    type="text"
                    name="profile"
                    value={profile}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel>Enter Your Location</FormLabel>
                  <Input
                    type="text"
                    name="location"
                    value={location}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
            </HStack>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"red.700"}
                color={"white"}
                _hover={{
                  bg: "red.500",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default RegisterUser;
