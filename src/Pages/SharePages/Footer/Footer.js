import {
  Box,
  Center,
  Circle,
  Flex,
  HStack,
  Icon,
  Image,
  VStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import logo from "../../../images/logo/logo-combined.png";
import paymentOptions from "../../../images/footer/payment.png";
import {
  FaTwitter,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { BsFillHouseFill } from "react-icons/bs";
import Contact from "../../Optional/Contact/Contact";
import { map } from "jquery";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const socialData = [
  { icon: FaTwitter },
  { icon: FaYoutube },
  { icon: FaFacebookF },
  { icon: FaLinkedinIn },
];

const quickLinksData = [
  { text: "Contact", to: "contact" },
  // { text: "Bank Details", to: "bankdetail" },
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
    text: "09613123123",
    icon: FaPhoneAlt,
  },
  {
    text: "support@firsttrip.com",
    icon: GrMail,
  },
];

const Footer = () => {
  return (
    <>

      <Box className="container-fluid" bg="#591b7d" >
        <Box className="container">
          <Flex w="100%" pt={'20px'} pb='10px' justifyContent="space-between" color={'white'}>
            <Box className="d-flex align-items-center">
              {/* <div  w="160px" h="103px" /> */}
            
                {socialData.map((item, idx) => (
                  <Circle bg="#E0ECFB" size="45px" key={idx} className="mx-1">
                    <Icon as={item.icon} h="22px" w="22px" color='black' />
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
                  <Text fontSize="14px" fontWeight={400} mb="17px">
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
                    color={'white'}
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
      <Box display={'flex'} justifyContent='center'>
        <Box >
          <img src={logo} alt="" width='100px' height={"10px"} />
        </Box>
        <Box>
          <Text fontSize="14px"
            fontWeight={400}
            color="#908DAB"
            textAlign="center"
            mt="20px"
            mb="20px"
          >© Copyright First Trip Ltd. All rights reserved.</Text>
        </Box>
      </Box>


    </>


  );
};

export default Footer;
