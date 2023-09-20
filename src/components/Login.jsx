import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import sideImage from "../image/human.jpeg";
import logo from "../image/sai.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleEye = () => setShow(!show);

  const handleLogin = async () => {
  try {
    const payloadData = {
      uid: username,
      password: password,
      blocked: 0,
    };

    localStorage.setItem("user", JSON.stringify(payloadData));
    const base64Payload = btoa(JSON.stringify(payloadData));

    console.log(base64Payload)

    const response = await fetch(
      "https://myphysio.digitaldarwin.in/api/login_v1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: base64Payload,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const encryptedResponse = await response.json();


    const decryptedResponse = atob(encryptedResponse.response);

    const responseObj = JSON.parse(decryptedResponse);

    localStorage.setItem("jwt", JSON.stringify(responseObj.jwt));
    if (responseObj.message === "login successfully") {
     navigate('/dashboard')
    } else {
      setLoginError("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    setLoginError("Login failed");
  }
};

  return (
    <Box
      w="100vw"
      h="100vh"
      color="#fff"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        backgroundColor={"#0B4F86"}
        display="flex"
        flexWrap="wrap"
        borderRadius="10px"
      >
        <Box w="60%" h="100%">
          <Image
            w="800px"
            h="400px"
            src={sideImage}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          w="40%"
          p="20px"
        >
          <Image w="60px" h="40px" src={logo} />
          <Heading as="h4" size="md">
            NCSSR
          </Heading>
          <Heading as="h6" size="sm">
            Welcome Back!
          </Heading>
          <Text>Forgot Password?</Text>
          <Text>Build Date:- 20--3-2023 06:25</Text>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pr="4.5rem"
                type={show ? "text" : "password"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleEye}>
                  {show ? (
                    <Icon boxSize={4} as={FiEye}></Icon>
                  ) : (
                    <Icon boxSize={4} as={FiEyeOff}></Icon>
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button my="20px" colorScheme="blue" onClick={handleLogin}>
            Login
          </Button>
          {loginError && <Text color="red">{loginError}</Text>}
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
