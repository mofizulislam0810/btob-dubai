import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthProvider/AuthProvider";
import ForgotPassword from "./Pages/AuthenticationPage/ForgotPassword/ForgotPassword";
import LoginPage from "./Pages/AuthenticationPage/LoginPage/LoginPage";
import Balance from "./Pages/Balance/Balance";
import BookingModal from "./Pages/BookingResultPage/BookingModal/BookingModal";
import FailedBookingPage from "./Pages/BookingResultPage/FailedBookingPage/FailedBookingPage/FailedBookingPage";
import SuccessBookingPage from "./Pages/BookingResultPage/SuccessBookingPage/SuccessBookingPage/SuccessBookingPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage/DashboardPage";
import FlightHistoryPage from "./Pages/FlightHistoryPage/FlightHistoryPage/FlightHistoryPage";
import Markup from "./Pages/Markup/Markup";
import NoDataFoundPage from "./Pages/NoDataFoundPage/NoDataFoundPage/NoDataFoundPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage/ProfilePage";
import SearchPage from "./Pages/SearchPage/SearchPage/SearchPage";
import ShowAllFlightPage from "./Pages/ShowAllFlightPage/ShowAllFlightPage/ShowAllFlightPage";
import SuccessTicketPage from "./Pages/TicketingResultPage/SuccessTicketPage/SuccessTicketPage/SuccessTicketPage";
import TravelCartConfirmPage from "./Pages/TravelCartConfirmPage/TravelCartConfirmPage/TravelCartConfirmPage";
import TravelCartPage from "./Pages/TravelCartPage/TravelCartPage/TravelCartPage";
import ViewFlightHistory from "./Pages/ViewFlightHistory/ViewFlightHistory/ViewFlightHistory";
import Staff from "./Pages/Staff/Staff";
import Support from "./Pages/Support/Support";
import Queues from "./Pages/Queues/Queues";
import Proposal from "./Pages/Proposal/Proposal";
import PrivateRoute from "./Pages/AuthenticationPage/PrivateRoute/PrivateRoute";
import Registration from "./Pages/AuthenticationPage/Registration/Registration";
import QuickPassenger from "./Pages/QuickPassenger/QuickPassenger";
import Loading from "./Pages/Loading/Loading";
import Contact from "./Pages/Optional/Contact/Contact";
import BankDetails from "./Pages/Optional/BankDetails/BankDetails";
import PrivacyPolicy from "./Pages/Optional/PrivacyPolicy/PrivacyPolicy";
import TermCondition from "./Pages/Optional/TermCondition/TermCondition";
import RefundAndCancellation from "./Pages/Optional/RefundAndCancellation/RefundAndCancellation";
import FAQ from "./Pages/Optional/FAQ/FAQ";
import Ticket from "./Pages/Ticket/Ticket";
import Voucher from "./Pages/Voucher/Voucher";
import Invoice from "./Pages/Invoice/Invoice";
import BookedView from "./Pages/BookedView/BookedView";
import FailedTicketPage from "./Pages/TicketingResultPage/FailedTicketPage/FailedTicketPage";
import CompanyBankAccount from "./Pages/CompanyBankAccount/CompanyBankAccount";
import Description from "./Pages/Description/Description";
import Ledger from "./Pages/Ledger/Ledger";
import SalesReport from "./Pages/Reports/SalesReport/SalesReport";
import { useState } from "react";
import TicketOrderSuccess from "./Pages/TicketingResultPage/TicketOrderSuccess/TicketOrderSuccess";
import CreditNotes from "./Pages/CreditNotes/CreditNotes";
import CheckoutSuccess from "./Pages/CheckoutConfirmation/CheckoutSuccess";
import CheckoutFailed from "./Pages/CheckoutConfirmation/CheckoutFailed";
import { Box } from "@chakra-ui/react";
import cardBg from "../src/images/landing/landing-bg.png";
import RegComplete from "./Pages/AuthenticationPage/RegComplete/RegComplete";
import Issued from "./Pages/Queues/Issued";
import Booked from "./Pages/Queues/Booked";
import Canceled from "./Pages/Queues/Canceled";
import InvoiceView from "./Pages/InvoiceView/InvoiceView";
import Expired from "./Pages/Queues/Expired";
import LoanLedger from "./Pages/Ledger/LoanLedger";
import ResetPassword from "./Pages/AuthenticationPage/ResetPassword/ResetPassword";
import EmiPolicy from "./Pages/Optional/EmiPolicy";
import CancleTicketView from "./Pages/CancleTicketView/CancleTicketView";
function App() {
  var isLoggedIn = localStorage.getItem("token") !== null ? true : false;
  console.log(isLoggedIn);
  return (
    <Box>
      <Box
        w="100%"
        h="100vh"
        backgroundImage={`url(${cardBg})`}
        zIndex={0}
        position="absolute"
      />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isLoggedIn ? <SearchPage /> : <LoginPage />} />
            <Route path="/registration" element={isLoggedIn ? <SearchPage /> : <Registration />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bankdetail" element={<BankDetails />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termandcondition" element={<TermCondition />} />
            <Route path="/EmiPolicy" element={<EmiPolicy />} />
            <Route path="/regsuccess" element={<RegComplete />} />
            <Route
              path="/resetpassword"
              element={
                <ResetPassword />
              }
            />
            <Route
              path="/refundandcancellation"
              element={<RefundAndCancellation />}
            />
            <Route path="/faq" element={<FAQ />} />
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <SearchPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/showallflight"
              element={
                <PrivateRoute>
                  <ShowAllFlightPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/travellcart"
              element={
                <PrivateRoute>
                  <TravelCartPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/cancelticket"
              element={
                <PrivateRoute>
                  <CancleTicketView />
                </PrivateRoute>
              }
            />
            <Route
              path="/cartconfirm"
              element={
                <PrivateRoute>
                  <TravelCartConfirmPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/successbooking"
              element={
                <PrivateRoute>
                  <SuccessBookingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/failedbooking"
              element={
                <PrivateRoute>
                  <FailedBookingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookingmodal"
              element={
                <PrivateRoute>
                  <BookingModal />
                </PrivateRoute>
              }
            />
            <Route
              path="/successticket"
              element={
                <PrivateRoute>
                  <SuccessTicketPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/flighthistory"
              element={
                <PrivateRoute>
                  <FlightHistoryPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/view"
              element={
                <PrivateRoute>
                  <ViewFlightHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/balance"
              element={
                <PrivateRoute>
                  <Balance></Balance>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage></DashboardPage>
                </PrivateRoute>
              }
            />
            <Route
              path="/balance"
              element={
                <PrivateRoute>
                  <Balance></Balance>
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/markup"
              element={
                <PrivateRoute>
                  <Markup></Markup>
                </PrivateRoute>
              }
            /> */}
            <Route
              path="/support"
              element={
                <PrivateRoute>
                  <Support></Support>
                </PrivateRoute>
              }
            />
            <Route
              path="/Queues"
              element={
                <PrivateRoute>
                  <Queues></Queues>
                </PrivateRoute>
              }
            />
            <Route
              path="/Staff"
              element={
                <PrivateRoute>
                  <Staff></Staff>
                </PrivateRoute>
              }
            />
            <Route
              path="/proposal"
              element={
                <PrivateRoute>
                  <Proposal></Proposal>
                </PrivateRoute>
              }
            />
            <Route
              path="/forgotpassword"
              element={<ForgotPassword></ForgotPassword>}
            />
            <Route
              path="/quickpassenger"
              element={
                <PrivateRoute>
                  <QuickPassenger></QuickPassenger>
                </PrivateRoute>
              }
            />
            <Route
              path="/ticket"
              element={
                <PrivateRoute>
                  <Ticket />
                </PrivateRoute>
              }
            />
            <Route
              path="/invoice"
              element={
                <PrivateRoute>
                  <Invoice />
                </PrivateRoute>
              }
            />
            <Route
              path="/voucher"
              element={
                <PrivateRoute>
                  <Voucher />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookedview"
              element={
                <PrivateRoute>
                  <BookedView />
                </PrivateRoute>
              }
            />
            <Route
              path="/processticket"
              element={
                <PrivateRoute>
                  <FailedTicketPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/cbankaccount"
              element={
                <PrivateRoute>
                  <CompanyBankAccount />
                </PrivateRoute>
              }
            />
            <Route
              path="/details"
              element={
                <PrivateRoute>
                  <Description />
                </PrivateRoute>
              }
            />
            <Route
              path="/ledger"
              element={
                <PrivateRoute>
                  <Ledger />
                </PrivateRoute>
              }
            />
            <Route
              path="/loanledger"
              element={
                <PrivateRoute>
                  <LoanLedger />
                </PrivateRoute>
              }
            />
            <Route
              path="/salesreport"
              element={
                <PrivateRoute>
                  <SalesReport></SalesReport>
                </PrivateRoute>
              }
            />
            <Route
              path="/successorderticket"
              element={
                <PrivateRoute>
                  <TicketOrderSuccess></TicketOrderSuccess>
                </PrivateRoute>
              }
            />

            <Route
              path="/creditnote"
              element={
                <PrivateRoute>
                  <CreditNotes />
                </PrivateRoute>
              }
            />
            <Route
              path="/checkoutsuccess"
              element={
                <PrivateRoute>
                  <CheckoutSuccess></CheckoutSuccess>
                </PrivateRoute>
              }
            />
            <Route
              path="/checkoutfailed"
              element={
                <PrivateRoute>
                  <CheckoutFailed></CheckoutFailed>
                </PrivateRoute>
              }
            />
            <Route
              path="/ticketed"
              element={
                <PrivateRoute>
                  <Issued />
                </PrivateRoute>
              }
            />
            <Route
              path="/booked"
              element={
                <PrivateRoute>
                  <Booked />
                </PrivateRoute>
              }
            />
            <Route
              path="/canceled"
              element={
                <PrivateRoute>
                  <Canceled />
                </PrivateRoute>
              }
            />
            <Route
              path="/invoiceview"
              element={
                <PrivateRoute>
                  <InvoiceView />
                </PrivateRoute>
              }
            />
            <Route
              path="/expired"
              element={
                <PrivateRoute>
                  <Expired />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Box>
  );
}

export default App;
