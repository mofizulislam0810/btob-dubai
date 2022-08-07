import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../images/logo/logo-combined.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterLR from "../../Optional/FooterLR/FooterLR";
import "./LoginPage.css";
import {
  Box,
  Center,
  Flex,
  Image,
  Hide,
  Text,
  Divider,
  VStack,
  Switch,
  Button,
  HStack,
  InputGroup,
  InputRightElement,
  Input,
  Heading,
  Circle,
} from "@chakra-ui/react";
import cardImage from "../../../images/landing/card.png";
import flightsImg from "../../../images/landing/flights.png";
import hotlelsImg from "../../../images/landing/hotels.png";
import holidaysImg from "../../../images/landing/holidays.png";
import visaProcessingImg from "../../../images/landing/visa-processing.png";
import cardBg from "../../../images/landing/landing-bg.png";

import { MdOutlineEmail } from "react-icons/md";
import { BsEyeSlash } from "react-icons/bs";
import { nanoid } from "nanoid";

const LoginPage = () => {
  const { onClickLoginButton } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  // const handleOnBlur = (e) => {
  //   const field = e.target.name;
  //   const value = e.target.value;
  //   const newLoginData = { ...loginData };
  //   newLoginData[field] = value;
  //   setLoginData(newLoginData);
  // };

  const handleLoginUser = (e) => {
    let loginData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    onClickLoginButton(loginData, navigate, location, toast);
    e.preventDefault();
  };

  const ourServiceData = [
    { text: "Flights", img: flightsImg },
    { text: "Hotels", img: hotlelsImg },
    { text: "Holiday", img: holidaysImg },
    { text: "Visa Processing", img: visaProcessingImg },
  ];

  // backgroundImage={`url(${cardBg})`}
  return (
    <VStack>
      <Center w="100%" h="100vh" backgroundImage={`url(${cardBg})`}>
        <Flex
          borderRadius="5px"
          overflow="hidden"
          boxShadow="0px 4px 67px rgba(156, 156, 156, 0.25)"
        >
          <div className="login-box">
            <ToastContainer />
            <div className="card">
              <Center className="text-center">
                <Image
                  src={logo}
                  alt="Triplover"
                  w="225px"
                  h="84px"
                  mt={8}
                  mb={6}
                />
              </Center>
              <div className="card-body login-card-body">
                {/* <p className="login-box-msg">Sign in to start your session</p> */}
                <VStack spacing="0px" mb={4}>
                  <Divider h="1px" color="#dddddd" mb="-12px" />
                  <Text
                    zIndex={1}
                    bg="white"
                    display="inline-block"
                    px="16px"
                    fontSize="16px"
                    fontWeight={400}
                  >
                    Sign in to start your session
                  </Text>
                </VStack>

                <form onSubmit={handleLoginUser}>
                  <InputGroup my={2}>
                    <InputRightElement
                      pointerEvents="none"
                      children={<MdOutlineEmail color="#B8B8B8" />}
                    />
                    <Input
                      border="1px solid #dddddd"
                      focusBorderColor="primary"
                      id="email"
                      name="email"
                      type="email"
                      className="form-control rounded"
                      placeholder="Email"
                      required
                    />
                  </InputGroup>

                  <InputGroup my={2} mb={6}>
                    <InputRightElement
                      pointerEvents="none"
                      children={<BsEyeSlash color="#B8B8B8" />}
                    />
                    <Input
                      border="1px solid #dddddd"
                      focusBorderColor="primary"
                      id="password"
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      className="form-control rounded"
                      placeholder="Password"
                      required
                    />
                  </InputGroup>

                  <div className="row">
                    <div className="col-12">
                      <div className="icheck-primary">
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <HStack>
                            <Switch
                              pt={2}
                              colorScheme="facebook"
                              size="sm"
                              type="checkbox"
                              id="remember"
                            />
                            {/* <input
                              className="me-1"
                              type="checkbox"
                              id="remember"
                            /> */}
                            <Text fontWeight={400} fontSize="12px">
                              Remember me
                            </Text>
                          </HStack>

                          <Link to="/forgotpassword">
                            <Text
                              fontWeight={300}
                              fontSize="13px"
                              color="secondary"
                            >
                              Recover Password
                            </Text>
                          </Link>
                        </Flex>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 my-3">
                      <Box
                        w="100%"
                        h="55px"
                        type="submit"
                        //className="btn button-color text-white fw-bold btn-block rounded btn-sm"
                        bg="gradient"
                        color="white"
                        fontSize="16px"
                        fontWeight={400}
                        borderRadius="6px"
                        _hover={{ opacity: 0.9 }}
                      >
                        <Center h="100%">Login</Center>
                      </Box>
                    </div>
                  </div>
                </form>

                <HStack spacing={1} alignItems="baseline">
                  <Text fontSize="12px" fontWeight={400}>
                    New user?
                  </Text>
                  <Link to="/registration">
                    <Text
                      fontSize="13px"
                      fontWeight={500}
                      color="primary"
                      _hover={{ fontWeight: 600 }}
                    >
                      Sign Up
                    </Text>
                  </Link>
                </HStack>
              </div>
            </div>
          </div>
          <Hide below="md">
            <Box bg="background">
              <Image
                w="460px"
                layout="fill"
                objectFit="cover"
                src={cardImage}
                alt="Cities"
                h="461px"
              />
            </Box>
          </Hide>
        </Flex>
      </Center>

      {/* <div className="login-form">
          <FooterLR></FooterLR>
        </div> */}

      <Text fontSize="21px" fontWeight={500}>
        Our Services
      </Text>

      <Flex gap="60px" py="50px">
        {ourServiceData.map((item) => (
          <VStack gap={"22px"} key={nanoid()}>
            <Circle
              bg="white"
              boxShadow=" 0px 11px 20px rgba(224, 239, 255, 0.32)"
            >
              <Image src={item.img} alt="flights" w="60px" h="60px" m="45px" />
            </Circle>
            <Text fontWeight={400} fontSize="16px" color="text">
              {item.text}
            </Text>
          </VStack>
        ))}
      </Flex>
    </VStack>
  );
};

export default LoginPage;
