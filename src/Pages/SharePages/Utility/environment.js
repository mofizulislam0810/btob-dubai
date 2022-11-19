 const baseURL='http://localhost:7236/';
// const baseURL='http://52.221.202.198:83/';
// const baseURL='http://13.212.45.180:81/';
// const baseURL = "http://54.169.108.46:81/";
// const baseURL = 'http://18.142.212.139:81/';
// const baseURL = 'https://api.triplover.ae/';
// const baseURL = 'https://api.firsttrip.com/';
// https://tlluploaddocument.s3.ap-southeast-1.amazonaws.com/
// https://fstuploaddocument.s3.ap-southeast-1.amazonaws.com/

const baseApiURL = baseURL + "api/";
const tokenData = JSON.parse(localStorage.getItem("token"));
let headerToken = { headers: { Authorization: "" } };
if (tokenData != null && new Date(tokenData.expireIn) >= new Date()) {
  headerToken = { headers: { Authorization: "Bearer " + tokenData?.token } };
}
export const environment = {
  s3URL: "https://fstuploaddocument.s3.ap-southeast-1.amazonaws.com/",
  baseApiURL: baseApiURL,
  headerToken: headerToken,

  register: baseApiURL + "user/b2bregister",
  login: baseApiURL + "user/b2blogin",
  currentUserInfo: baseApiURL + "user/GetCurrentUser",
  logoFileUpload: baseApiURL + "user/uploadB2B",

  userList: baseApiURL + "user",
  userProfileEdit: baseApiURL + "user/B2BProfileEdit",
  searchFlight: baseApiURL + "Search",
  bookFlight: baseApiURL + "Book",
  ticketingFlight: baseApiURL + "Ticket",
  priceCheck: baseApiURL + "RePrice",
  getFareRules: baseApiURL + "FareRules",
  getLastTicketTime: baseApiURL + "pnr",

  getCalendarEventBooking: baseApiURL + "B2BDashboard/GetCalendarEventBooking",

  cityList: baseApiURL + "Dropdown/Cities",
  bankAccounts: baseApiURL + "Dropdown/bankaccounts",
  getairlineList: baseApiURL + "Dropdown/Airlines",
  getcountryList: baseApiURL + "Dropdown/Countries",
  getairportList: baseApiURL + "Dropdown/Airports",
  getzoneListbycountryName: baseApiURL + "dropdown/ZonesByCountryName",
  getcityListbycountryName: baseApiURL + "dropdown/CitiesByCountryName",
  getsupporttypeList: baseApiURL + "Dropdown/SupportTypes",
  getsubjectList: baseApiURL + "Dropdown/SupportSubjects",
  accountsByAgentDropdown: baseApiURL + "Dropdown/AgentBankAccountsByAgent",

  depositRequest: baseApiURL + "B2BBalance/DepositRequest",
  agentDeposits: baseApiURL + "B2BBalance/AgentDeposits",
  agentFileUpload: baseApiURL + "B2BBalance/Upload",
  paymentCheckout: baseApiURL + "B2BBalance/Checkout",
  branchList: baseApiURL + "B2BBalance/GetBranches",

  bankAccountsByAgent: baseApiURL + "B2BBankAccount/AgentBankAccountsByAgent",
  bankAccount: baseApiURL + "B2BBankAccount",

  markupsByAgent: baseApiURL + "B2BDynamicMarkup/MarkupsByAgent",
  markupsDelete: baseApiURL + "B2BDynamicMarkup/Delete",
  markup: baseApiURL + "B2BDynamicMarkup",

  getSupportInfoesByStatustList:
    baseApiURL + "B2BSupportInfo/SupportInfoesByStatus",
  supportInfo: baseApiURL + "B2BSupportInfo",
  supportFileUpload: baseApiURL + "B2BSupportInfo/Upload",
  supportHistory: baseApiURL + "B2BSupportHistory",
  historyFileUpload: baseApiURL + "B2BSupportHistory/Upload",
  getSupportHistoriesByAgentList:
    baseApiURL + "B2BSupportHistory/SupportHistoriesByAgent",
  getSupportNoticeCountByAgent:
    baseApiURL + "B2BSupportHistory/SupportNoticeCountByAgent",
  getSupportNoticeByAgent:
    baseApiURL + "B2BSupportHistory/SupportNoticeByAgent",

  accountManagerInfo: baseApiURL + "B2BAccountManager/GetByAgentId",
  agentStaff: baseApiURL + "B2BStaff",
  getAgentStaffByAgent: baseApiURL + "B2BStaff/GetAgentStaffs",
  getAgentSettingById: baseApiURL + "B2BStaff/GetAgentSettings",

  sendEmailProposal: baseApiURL + "B2BEmail/SendProposal",
  sendEmailInvoice: baseApiURL + "B2BEmail/SendInvoice",
  sendEmailBooking: baseApiURL + "B2BEmail/SendBooking",

  agentInfo: baseApiURL + "B2BInfo/GetByUserId",
  getAgentPassengers: baseApiURL + "B2BInfo/AgentPassengers",
  saveAgentPassenger: baseApiURL + "B2BInfo/SaveAgentPassenger",
  deleteAgentPassenger: baseApiURL + "B2BInfo/DeletePassenger",
  passengerupload: baseApiURL + "B2BInfo/passengerupload",

  accountLedger: baseApiURL + "B2BAccountLadger/AgentAccountLadger",
  agentLoanLedger: baseApiURL + "B2BLoan/AgentloanLadger",
  marqueeList: baseApiURL + "B2BMarquee",
  paymentGateway: baseApiURL + "PaymentGateway",

  getInvoice: baseApiURL + "B2BReport/OtherInvoice",
  // creditList : baseApiURL + 'CreditList/CreditList',

  changeTicketStatus: baseApiURL + "B2BTicketInfo/ChangeStatus",
  ticketRefundRequest: baseApiURL + "B2BTicketInfo/RefundRequest",

  highestTicktedAirlines: baseApiURL + "B2BDashboard/HighestTicktedAirlines",
  totalBooking: baseApiURL + "B2BDashboard/TotalBooking",
  totalTicket: baseApiURL + "B2BDashboard/TotalTicket",
  totalSales: baseApiURL + "B2BDashboard/TotalSales",

  getTicketingList: baseApiURL + "B2BReport/AirTicketing",
  passengerListByIds: baseApiURL + "B2BReport/PassengerListByIds",
  passengerListByPnr: baseApiURL + "B2BReport/PassengerListByPnr",
  udatePriceByReference: baseApiURL + "B2BReport/UpdatePriceByReference",
  updateBookingFareBreakdown:
    baseApiURL + "B2BReport/UpdateBookingFareBreakdown",
  salesReport: baseApiURL + "B2BReport/GetSalesReport",
  segmentList: baseApiURL + "B2BReport/SegmentsByTransactionId",
  creditNoteList: baseApiURL + "B2BReport/GetCreditNoteByAgentId",
  getTicketingDetails: baseApiURL + "B2BReport/AirTicketingDetails",
  getTicketingDetailsCancel: baseApiURL + "B2BReport/AirTicketingDetailsCanceled",
  airTicketingSearch: baseApiURL + "B2BReport/AirTicketingSearch",
  searchLogs: baseApiURL + "B2BReport/SearchLogsByUser",

  sendEmailWithResetLink: baseApiURL + "PasswordRecovery/SendResetLink",
  changePassword: baseApiURL + "PasswordRecovery/changePassword",
};
