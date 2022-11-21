import React, { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import $ from "jquery";
import "./BookingModal.css";
import { useNavigate } from "react-router-dom";
import { environment } from "../../SharePages/Utility/environment";
import axios from "axios";

const BookingModal = () => {
  const sendObj = JSON.parse(localStorage.getItem("passengerPack"));
  const navigate = useNavigate();
  const { bookData } = useAuth();
  // const handleCancle = () => {
  //   document.getElementsByClassName("modal-backdrop")[0].remove();
  //   navigate("/");
  // };

  const handleBooking = () => {
    navigate("/");
    // async function booking(price) {
    //   sendObj.PriceCodeRef = price;
    //   await axios.post(environment.bookFlight, sendObj).then((response) => {
    //     if (response.data.item2.isSuccess === true) {
    //       document.getElementsByClassName("modal-backdrop")[0].remove();
    //       navigate("/successbooking");
    //     } else {
    //       document.getElementsByClassName("modal-backdrop")[0].remove();
    //       navigate("/failedbooking");
    //     }
    //   });
    // }
    // booking(bookData.data.item1.priceCodeRef);
  };
  useEffect(() => {
    $("#modal").click();
  }, []);
  return (
    <>
      <div
        id="modal"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      ></div>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col-lg-9 text-center">
                    <h5 class="bg-success p-2">
                      Your selected price has been changed!
                    </h5>
                  </div>
                  <div className="col-lg-3 my-auto">
                    <h5 className="text-end text-success">
                      New Price is AED {bookData.data.item1.totalPrice}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              {/* <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCancle}
              >
                Cancel
              </button> */}
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleBooking}
              >
                Search Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
