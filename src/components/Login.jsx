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
import React, { useContext, useState } from "react";
import sideImage from "../image/human.jpeg";
import logo from "../image/sai.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

function Login(props) {
  const {trueAuth, falseAuth}  = useContext(AuthContext)
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEye = () => setShow(!show);

  const handleLogin = async (e) => {
    e.preventDefault();


    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Username is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }

    if (username && password) {
      try {
        const payloadData = {
          username,
          password,
        };

        localStorage.setItem("userData", JSON.stringify(payloadData));

        const response = await axios.post(
          process.env.REACT_APP_LOGIN_URI,
          { username, password },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              Vary: "Accept",
            },
          }
        );

        if (response.status !== 200) {
          setLoginError("Login failed");
          falseAuth();
        } else {
          setLoginError("Login Successful");
          trueAuth();
          localStorage.setItem("physioToken", response.data.token);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Login error:", error);
        setLoginError("Login failed");
        falseAuth();
      }
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
          <Image w="800px" h="400px" src={sideImage} />
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
            {usernameError && <Text color="red">{usernameError}</Text>}
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
                {passwordError && <Text color="red">{passwordError}</Text>}
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
