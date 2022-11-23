import { Box, Circle, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillHouseFill } from "react-icons/bs";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaInstagram
} from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { Link } from "react-router-dom";
import logo from "../../../images/logo/logo-combined.png";

const socialData = [
  { icon: FaFacebookF },
  { icon: FaInstagram },
  { icon: FaLinkedinIn },
];


const quickLinksData = [
  { text: "About Us", to: "aboutus" },
  { text: "Contact", to: "contact" },
  // { text: "Bank Details", to: "bankdetail" },
  { text: "EMI Policy", to: "EmiPolicy" },
  { text: "Privacy Policy", to: "privacypolicy" },
  { text: "Terms And Conditions", to: "termandcondition" },
  { text: "Refund & Cancellation", to: "refundandcancellation" },
];

const addressData = [
  {
    text: `39 Sharif Plaza, Kemal Ataturk Avenue, Banani, Dhaka 1213`,
    icon: BsFillHouseFill,
  },
  {
    text: "01322819380",
    icon: FaPhoneAlt,
  },
  {
    text: "info@travelchamp.com",
    icon: GrMail,
  },
];

const Footer = () => {
  return (
    <>
      <Box className="container-fluid" bg="#ed7f22">
        <Box className="container">
          <Flex
            w="100%"
            pt={"20px"}
            pb="10px"
            justifyContent="space-between"
            color={"white"}
          >
            <Box className="d-flex align-items-center">
              {/* <div  w="160px" h="103px" /> */}

              {socialData.map((item, idx) => (
                <Circle bg="#E0ECFB" size="45px" key={idx} className="mx-1">
                  <Icon as={item.icon} h="22px" w="22px" color="black" />
                </Circle>
              ))}
            </Box>

            {/* <Box borderRight="1px" color="#ECECEC" my={2} /> */}

            <Box>
              <Text fontSize="18px" fontWeight={500} mb="24px">
                Quick Links
              </Text>
              {quickLinksData.map((item, idx) => (
                <Link to={`/${item.to}`} key={idx}>
                  <Text fontSize="14px" fontWeight={400} mb="8px">
                    {item.text}
                  </Text>
                </Link>
              ))}
            </Box>

            {/* <Box borderRight="1px" color="#ECECEC" my={2} /> */}

            <Box>
              <Text fontSize="18px" fontWeight={500} mb="24px">
                Address
              </Text>
              {addressData.map((item, idx) => (
                <HStack gap="8px" mb="18px" key={idx}>
                  <Icon
                    as={item.icon}
                    h="26px"
                    w="24px"
                    // color="rgba(28, 25, 55, 0.72)"
                    color={"white"}
                  />
                  <Text fontSize="14px" fontWeight={400} maxW="240px">
                    {item.text}
                  </Text>
                </HStack>
              ))}
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* <Box borderTop="1px solid #E2E2E2" mx={4} /> */}
      <Box display={"flex"} justifyContent="center" alignItems="center" className="py-3">
        <img src={logo} alt="" width="100px" height={"10px"} />
        <Text
          fontSize="14px"
          fontWeight={400}
          color="#908DAB"
          textAlign="center"
          pl="5px"
        >
          {" "}
          Copyright © 2022 Travelchamp Ltd. All rights reserved.
        </Text>
      </Box>
    </>
  );
};

export default Footer;
