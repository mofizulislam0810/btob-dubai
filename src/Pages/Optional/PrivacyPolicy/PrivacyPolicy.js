import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Footer from "../../SharePages/Footer/Footer";
import FooterLR from "../FooterLR/FooterLR";
import Navbar from "../Navbar/Navbar";

const PrivacyPolicy = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <Navbar></Navbar>
      <div className="hold-transition login-page search-panel-bg">
        <div className="container mt-3">
          <div className="row">
            <div className="col-lg-12 " pb={'10px'}>
              <Text fontWeight={700} fontSize='20px'>Privacy Policy</Text>
            </div>

            <Box>
              <Text pb={'20px'}>
                Your trust is important to Travelchamp, and we want you to realize how we gather, manage, and share information. This privacy statement explains how we recognize the data we receive from you when you visit our websites, use any mobile applications we make available ("Apps"), or purchase or engage in any of the services we make available through our various channels.
              </Text>

              <Text pb={'20px'}>
                In order to make reservations and booking the services for the customer/traveler, the name, address, phone number, credit and debit card number and related information, passport number, social media ID links and age of the traveler are provided with the appropriate service providers, such as the airlines, hotels, buses etc. In addition, for service quality, website updates and other information, as well as marketing and promotional purposes, we will connect with you, either ourselves or using one of our associates. You can still explore the Travelchamp website without providing this information, but you might not be able to avail of all the options, promotions, and facilities. We might also disclose your personal information if it's necessary to follow the law or any legal request for information, or if it's necessary to defend our rights.

              </Text>

              <Text pb={'20px'}>

                The other advertisers and websites are not subject to our privacy policy. For additional in-depth information, we therefore suggest you review the individual privacy policies of these third-party ad servers. Their procedures and guidelines on how to decline particular choices might be included. Cookies can be turned off using the tools available in each browser. You can visit the websites of each web browser in question to learn more in-depth details on managing cookies with that particular browser.
              </Text>

              <Text pb={'20px'}>
                To keep your personal information secured within our business, we try to apply appropriate organizational, technical, and operational measures. Please let us know instantly if you have any evidence to suggest that interactions with us are no longer secure, for instance, if you suspect the security of your account has been exploited.

              </Text>
            </Box>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default PrivacyPolicy;
