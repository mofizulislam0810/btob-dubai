import { useState } from "react";
import axios from "axios";
import { environment } from "../Pages/SharePages/Utility/environment";

const useAuthentication = () => {
  const [bookData, setBookData] = useState([]);
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [login, setLogin] = useState(token && token.length > 0);
  let [fareRules, setFareRules] = useState({});
  const [count, setCount] = useState(0);
  const [id, setId] = useState();

  const onClickLoginButton = (loginData, navigate, location, toast) => {
    setLoading(true);
    axios
      .post(environment.login, loginData)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.isSuccess == true) {
          localStorage.setItem("token", JSON.stringify(response.data.data));
          localStorage.setItem("LoginData", JSON.stringify(loginData));
          setLogin(true);
          const destination = location.state?.from.pathname || "/search";
          // navigate(destination);
          toast.sucess(response.data.message);
          window.location.href = destination;
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        console.log("Please try again");
      })
      .finally(() => {
        setLoading(false);
      });
    // const onClickLoginButton = (loginData, navigate, location, toast) => {
    //   let data = {
    //     token:
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImthbXJ1bC5jc2VwdUBnbWFpbC5jb20iLCJuYmYiOjE2NDY5MDk2NjgsImV4cCI6MTY0NjkxMTQ2OCwiaWF0IjoxNjQ2OTA5NjY4fQ.rqz8GCO5oi8eeDw3ao5f0pLSQH0BsI8n9UI95SddFMw",
    //     refreshToken: null,
    //     expireIn: "2022-03-10T11:24:28.2451394Z",
    //     error: null,
    //   };
    //   sessionStorage.setItem("token", JSON.stringify(data));
    //   const useremail = "abcd@gmail.com";
    //   const password = "123456";
    //   if (useremail === loginData.email && password === loginData.password) {
    //     sessionStorage.setItem("LoginData", JSON.stringify(loginData));
    //     setLogin(true);
    //     const destination = location.state?.from || "/search";
    //     navigate(destination);
    //   } else {
    //     toast.error("Email or password is wrong!");
    //     navigate("/");
    //   }
  };

  const handleFareRules = (uId, dir, itemCode) => {
    const fareRulesObj = {
      itemCodeRef: itemCode,
      uniqueTransID: uId,
      segmentCodeRefs: [],
    };

    dir[0][0].segments.map((i) =>
      fareRulesObj.segmentCodeRefs.push(i.segmentCodeRef)
    );

    // if (Object.keys(dir[0][0]).length > 0) {
    //   dir[0][0].segments.map((i) =>
    //     fareRulesObj.segmentCodeRefs.push(i.segmentCodeRef)
    //   );
    // }
    console.log(fareRulesObj);

    // const fetchOptions = async(fareRulesObj) =>{
    //     setLoading(true);
    //     alert(loading);
    //     const response = await axios.post(environment.getFareRules, fareRulesObj, environment.headerToken);
    //     setFareRules(await response.data);
    //     // setLoading(false);
    // }
    async function fetchOptions() {
      // alert("ok");
      setLoading(true);
      await axios
        .post(environment.getFareRules, fareRulesObj, environment.headerToken)
        .then((response) => {
          setFareRules(response.data);
          // console.log(response);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    fetchOptions();
  };

  return {
    onClickLoginButton,
    login,
    setBookData,
    bookData,
    setTicketData,
    ticketData,
    setLoading,
    loading,
    setCount,
    count,
    setId,
    id,
    handleFareRules,
    fareRules,
    setFareRules,
  };
};

export default useAuthentication;
