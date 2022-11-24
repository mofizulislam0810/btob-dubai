import React from "react";
import FooterLR from "../FooterLR/FooterLR";
import Navbar from "../Navbar/Navbar";

const FAQ = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <Navbar></Navbar>
      <div className="hold-transition login-page search-panel-bg">
        <div className="container mt-3 text-white">
          <div className="row">
            <div className="col-md-12 margin-top margin-bottom">
              <h4>Frequently Asked Questions</h4>
            </div>

            <div className="col-md-12">
              <div className="faq-item mb-5">
                <ul className="toggle-menu list-items list--items-2 pt-4">
                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      1. Can I use my debit card to book a flight?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark" >
                        -Yes, you can use your local or international debit cards to book flights.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      2. Can I book my ticket directly on First trip?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -Yes, you can book both domestic and international flight services.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      3. Can I have a hard-copy of my ticket?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -You need to come to our office for a hard copy of your purchase.However, we will send the booking details and confirmation through email..{" "}
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      4. What is Service Fee?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -Service fee is the charge that the customer needs to pay for availing the service from online. As per the <br />Government rule, 5% VAT on the Service fee will be applied.

                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      5. Is the Service Fee refundable?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26">
                        -No, Service fee is not refundable.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >

                      6. Why did the fare increase when I tried to book?

                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -Airfares may change from time to time based on demand and availability and fluctuate at any time. If you<br /> don’t purchase your ticket instantly, you may not get the same fare on your next search.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >

                      7. What is the process of canceling a purchased ticket?

                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -B2B agents have to send an email to First trip reservation (support@firsttrip.com) with a request to cancel the ticket. Then the reservation will take necessary action and send a reply with proper documents.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      8. What is the process of rescheduling a ticket?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -B2B agents have to send an email to First trip reservation team (support@firsttrip.com) with a request to reschedule the ticket with desired date and flight. Then the reservation team will check with airlines. If seats are available, then the reservation team will take necessary action according to specific airline policy and send a reply to the agent with proper documents.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      9. What is the process of refund?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -B2B agents have to send an email to First trip reservation team (support@firsttrip.com) with a request to refund the ticket. Then the reservation will check with the airlines and take necessary action accordingly with specific airline policy and send a reply to the agent with proper documents.

                      </li>
                    </ul>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      10. What is EMI?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        - EMI refers to Equated Monthly Installment. EMI is the monthly installment you pay towards your loan over a specified loan tenure.

                      </li>
                    </ul>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      11. What are the available monthly installment tenures?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -You can choose from a 3 to 12 months plan depending on the policy of your card issuing bank.

                      </li>
                    </ul>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      12. Is there any additional Interest applicable for EMI?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -No, there will be no additional interest charge from our end, but a small service fee will be applied as per your tenure and bank policy.

                      </li>
                    </ul>
                  </li>


                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      13. Is early settlement possible?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -Yes, but that depends on the policy of your card issuing bank. You need to contact your back first for early settlement.

                      </li>
                    </ul>
                  </li>


                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      14. Can I avail EMI for multiple services?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        - Yes, you can.

                      </li>
                    </ul>
                  </li>


                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      15. What is the cost of applying for a visa?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -The cost of applying for a VISA varies from country to country. It depends on the Embassy in which you are applying.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >
                      16. What documents do I require to get a travel visa?
                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        Primary documents required to get a VISA:<br />
                        -Valid Passport with a minimum validity of seven months<br />
                        -Visa Application Form<br />
                        - Passport Size Photographs<br />
                        - Visa Fees<br />
                        - Bank Statement for a minimum of six months.<br />

                        <h4><b>thers Requirements:</b></h4>
                        - Birth Certificatebr <br />
                        - Driving License<br />
                        - Police Verification Certificate<br />
                        - No Objection Letter<br />
                        - Travel Ticket<br />
                        - Accommodation details<br />



                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >

                      17. How many days does it take for processing visa applications?

                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -Usually it will take 10 working days for sticker visas and 5 working days for E-Visas. However, it may vary depending on the Embassy.

                      </li>
                    </ul>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="toggle-menu-icon d-flex justify-content-between align-items-center fw-bold text-dark"
                    >

                      18. Is there any guarantee of getting a visa?

                      <i className="la la-angle-down"></i>
                    </a>
                    <ul className="toggle-drop-menu pt-2">
                      <li className="line-height-26 text-dark">
                        -Approval or rejection of a visa entirely depends on the decision by the Embassy. We hold no authority on approval/rejection of the Visa.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <FooterLR></FooterLR>
      </div>
    </>
  );
};

export default FAQ;
