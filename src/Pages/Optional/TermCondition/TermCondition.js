import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Footer from "../../SharePages/Footer/Footer";
import FooterLR from "../FooterLR/FooterLR";
import Navbar from "../Navbar/Navbar";
import { nanoid } from "nanoid";

const term = [
  { title: '➢	The terms and conditions, which are relevant to all of our services offered both online and offline, may be updated on a regular basis. The terms and conditions are subject to alteration or modification by Travelchamp at any moment and without previous notice. The customer agrees to frequently check this page for updates to the terms and conditions. ' },
  {
    title: '➢	If you use the Website, you are in charge of keeping your password and account information private, and you assume liability for all activities that occur under your account or password. Travelchamp retains the right to instantly cancel the reservation and remove the user`&aops`s account from our website.If we discover any suspicious or fraudulent reservations made under false pretenses or by users who violate any of the terms and conditions.'
  },
  { title: '➢	For our clients, we handle VISA processing. However, we only process the papers for the client in locations where submission must be made by an individual. If necessary, the individual must go through embassy interviews alone. All clients are required to confirm their travel documentation (transit visas/entry visas) for the nation they are transiting through or entering. If you are refused entry or transit into a country because suitable travel documents are not available, Travelchamp Ltd. is not liable. Even if the client is denied a visa, the visa cost and our service expenses are not refundable.' },
  { title: '➢	By using this site to make a payment, you consent to the use of your personal information for the purposes of transaction validation and verification to make sure that no one else is making use of your authorizations without your permission. You also recognize the possibility of disclosure of the information you supply to third-party credit card payment gateway companies for the purpose of verification. Other than to confirm and verify your identification, we shall only use your personal information for that one purpose.' }
]

const TermCondition = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <Navbar></Navbar>
      <div className="hold-transition login-page search-panel-bg" style={{ height: "100%" }}>
        <div className="container mt-3">
          <div className="row">
            <div className="col-lg-12 " pb={'10px'}>
              <Text fontWeight={700} fontSize='20px' pb={'10px'}>Terms & Condition</Text>
            </div>

            <Box pb={'30px'}>
              <Text>
                Thanks for visiting Travelchamp Ltd. We exclusively provide this Site to customers in order to aid them in acquiring travel-related information, determining the availability of goods and services related to travel, and making reservations or purchasing tickets. The terms and conditions listed below apply to use of the website. You recognize and agree that you have read, understood, and agreed to the terms and conditions by using the Site, whether it be for information perusal, making trip reservations, or for any other purpose.
              </Text>
              {
                term.map(item => {
                  return (
                    <Box key={nanoid()}>
                      <Text fontWeight={500} fontSize="md" color={'text'} key={nanoid()} pt='15px'>{item.title}</Text>
                    </Box>
                  )
                })
              }
            </Box>

          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default TermCondition;
