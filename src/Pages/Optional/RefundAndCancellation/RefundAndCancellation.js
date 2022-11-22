import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Footer from "../../SharePages/Footer/Footer";
import FooterLR from "../FooterLR/FooterLR";
import Navbar from "../Navbar/Navbar";
import { nanoid } from "nanoid";
const data = [
  {
    title: '➢	There will be a fee associated with airline refunds.'
  },
  {
    title: '➢	There will be an associated service fee'
  },
  {
    title: '➢	Travelers are recommended to confirm the first trip 72 hours before the scheduled departure date if they wish to cancel or reissue. In such a case, a no-show fee can be charged in accordance with the airline policy. '
  },

  {
    title: '	➢	Refunds only apply to refundable travel services. For domestic flights and flights abroad, the refund amount may appear in your account 3 to 7 working days and 3-6 weeks after the date of application, respectively.'
  },
  {
    title: '➢	The business will give you your money back in the exact same form that you paid with. When requesting refunds for any transactions made via Mobile Financial Services, the customer must pay a service/cash-out fee.'
  },
  {
    title: '➢	The service fee for domestic flights is BDT 100 and BDT 300 for international flights.'
  },
  {
    title: '➢	Flights on the same calendar date will not be subject to the payment void policy.'
  },
  {
    title: '➢	On low-cost carrier flights such as those operated by Air Asia, Indigo, SpiceJet, Jazeera Airways, Fly Dubai, etc. payment void would not be applied.'
  },
]

const Hotel = [
  {
    title: '➢	The info you see on our website comes from our providers and clients. The hotel management has the right to alter the rate at any moment.Even though we make every effort to check the information, we cannot be held liable for any errors that may be provided by vendors or hotel employees.'
  },
  {
    title: '➢	Prior to making a reservation, it is the customer`&apos`s responsibility to check whether or not the hotel has a refund policy.'
  },
  {
    title: '➢	Within 7 working days, the customer will receive the refund according to the specific hotel and bank policy. '
  },

  {
    title: '	➢	No hotel reservation allows for date changes. You must rebook with the new date and cancel the prior reservation.'
  },
  {
    title: '➢	The service provider charges a service fee, which is not refundable.'
  },

]

const Tours = [
  {
    title: '➢	Before making a reservation, please review the policy listed under each tour.'
  },
  {
    title: '➢	Within 7 working days, the customer will receive their reimbursement according to the hotel and bank policy.'
  },
  {
    title: '➢ The service provider charges a service fee, which is not refundable. '
  },



]

const RefundAndCancellation = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <Navbar></Navbar>
      <div className="hold-transition login-page search-panel-bg" style={{ height: "100%" }}>
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-12" >
              <Text fontWeight={700} fontSize='20px' pb={'10px'}>Refund Policy</Text>
            </div>

            <Box>
              <Text pb={'20px'}>
                Travelchamp maintains the airline's reissue and cancellation policy. The service provider charges a service fee, which is not refundable. The service fee is what the customer must pay in exchange for the assistance, convenience, and service they receive from online platforms. The National Board of Revenue (NBR) has ordered that 5% VAT will be applied to the service fee.

              </Text>
              <Text fontWeight={700} fontSize='20px' pb={'5px'}>Flights:</Text>
              <Box mt="20px" >
                {
                  data.map(item => {
                    return (
                      <Box key={nanoid()}>
                        <Text fontWeight={500} fontSize="md" color={'text'} key={nanoid()} pt='1px'>{item.title}</Text>
                      </Box>
                    )
                  })
                }
              </Box>

              <Box>
                <Text fontWeight={700} fontSize='20px' pb={'10px'} pt={'20px'}>Hotel:</Text>
                <Text pb={'4px'}>Please email us at info@firsttrip.com with any questions regarding refunds, cancellations, or date modifications.</Text>
                {
                  Hotel.map(item => {
                    return (
                      <Box key={nanoid()}>
                        <Text fontWeight={500} fontSize="md" color={'text'} key={nanoid()} pt='1px'>{item.title}</Text>
                      </Box>
                    )
                  })
                }

              </Box>

              <Box pt={'20px'} pb='30px'>
                <Text fontWeight={700} fontSize='20px' pb={'10px'}>Tours:</Text>
                {
                  Tours.map(item => {
                    return (
                      <Box key={nanoid()}>
                        <Text fontWeight={500} fontSize="md" color={'text'} key={nanoid()} pt='1px'>{item.title}</Text>
                      </Box>
                    )
                  })
                }
              </Box>

            </Box>




          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default RefundAndCancellation;
