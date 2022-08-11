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
    text: `Al Muhairi 113-127, Al Dhagaya, Deira, Dubai, United Arab Emirates.`,
    icon: BsFillHouseFill,
  },
  {
    text: "+97143375728",
    icon: FaPhoneAlt,
  },
  {
    text: "support@triplover.ae",
    icon: GrMail,
  },
];

const Footer = () => {
  return (
    <Box className="container">
      <Flex w="100%" mt="80px" mb="30px" justifyContent="space-between">
        <Box>
          <Image src={logo} alt="Triplover" w="160px" mb="24px" />
          <HStack gap="10px">
            {socialData.map((item) => (
              <Circle bg="#E0ECFB" size="45px" key={nanoid()}>
                <Icon as={item.icon} h="22px" w="22px" color="inactiveText" />
              </Circle>
            ))}
          </HStack>
        </Box>

        <Box borderRight="1px" color="#ECECEC" my={2} />

        <Box>
          <Text fontsize="18px" fontWeight={500} mb="24px">
            Quick Links
          </Text>
          {quickLinksData.map((item) => (
            <Link to={`/${item.to}`}>
              <Text fontSize="14px" fontWeight={400} mb="17px">
                {item.text}
              </Text>
            </Link>
          ))}
        </Box>

        <Box borderRight="1px" color="#ECECEC" my={2} />

        <Box>
          <Text fontsize="18px" fontWeight={500} mb="24px">
            Address
          </Text>
          {addressData.map((item) => (
            <HStack gap="8px" mb="18px">
              <Icon
                as={item.icon}
                h="26px"
                w="24px"
                color="rgba(28, 25, 55, 0.72)"
              />
              <Text fontSize="14px" fontWeight={400} maxW="240px">
                {item.text}
              </Text>
            </HStack>
          ))}
        </Box>
      </Flex>

      {/* <Center className="text-center">
        <Image src={paymentOptions} alt="payment options" w="650px" my="30px" />
      </Center> */}

      <Box borderTop="1px solid #E2E2E2" mx={4} />

      <Text
        fontSize="14px"
        fontWeight={400}
        color="#908DAB"
        textAlign="center"
        mt="25px"
        mb="30px"
      >
        © Copyright Triplover Limited. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
