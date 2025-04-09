import React, { useEffect, useState } from "react";
import moment from "moment";
import { Form, FormControl, Button } from "react-bootstrap";
import BookingSummary from "./BookingSummary";
import { bookTurf, getTurfById } from "../utils/ApiFunctions";  
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const BookingForm = () => {
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [turfPrice, setTurfPrice] = useState(0);

  const currentUser = localStorage.getItem("userId");

  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: currentUser,
    bookingDate: "", 
    numOfPlayers: "",
  });

  const { turfId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const getTurfPriceById = async (turfId) => {
    try {
      const response = await getTurfById(turfId); 
      setTurfPrice(response.turfPrice);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getTurfPriceById(turfId);
  }, [turfId]);

  const calculatePayment = () => {
    const bookingDate = moment(booking.bookingDate);
    const diffInHours = bookingDate.diff(moment(), "hours"); 
    const paymentPerHour = turfPrice ? turfPrice : 0;
    return diffInHours * paymentPerHour;
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numOfAdults);
    const childrenCount = parseInt(booking.numOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || !isGuestCountValid()) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setValidated(true);
  };

  const handleFormSubmit = async () => {
    try {
      const confirmationCode = await bookTurf(turfId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      navigate("/booking-success", { state: { error: errorMessage } });
    }
  };

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
              <h4 className="card-title">Reserve Turf</h4>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="guestFullName" className="hotel-color">
                    Fullname
                  </Form.Label>
                  <FormControl
                    required
                    type="text"
                    id="guestFullName"
                    name="guestFullName"
                    value={booking.guestFullName}
                    placeholder="Enter your fullname"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your fullname.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="guestEmail" className="hotel-color">
                    Email
                  </Form.Label>
                  <FormControl
                    required
                    type="email"
                    id="guestEmail"
                    name="guestEmail"
                    value={booking.guestEmail}
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                    // disabled
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>

                <fieldset style={{ border: "2px" }}>
                  <legend>Booking Period</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="bookingDate" className="hotel-color">
                        Booking Date (in hours)
                      </Form.Label>
                      <FormControl
                        required
                        type="datetime-local"
                        id="bookingDate"
                        name="bookingDate"
                        value={booking.bookingDate}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a valid booking date and time.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                </fieldset>

                <fieldset style={{ border: "2px" }}>
                  <legend>Number of Guests</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="numOfAdults" className="hotel-color">
                        Adults
                      </Form.Label>
                      <FormControl
                        required
                        type="number"
                        id="numOfAdults"
                        name="numOfAdults"
                        value={booking.numOfAdults}
                        min={1}
                        placeholder="1"
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select at least 1 adult.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-6">
                      <Form.Label htmlFor="numOfChildren" className="hotel-color">
                        Children
                      </Form.Label>
                      <FormControl
                        required
                        type="number"
                        id="numOfChildren"
                        name="numOfChildren"
                        value={booking.numOfChildren}
                        placeholder="0"
                        min={0}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Select 0 if no children.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </fieldset>

                <div className="fom-group mt-2 mb-2">
                  <button type="submit" className="btn btn-turf">
                    Continue
                  </button>
                </div>
              </Form>
            </div>
          </div>

          <div className="col-md-4">
            {isSubmitted && (
              <BookingSummary
                booking={booking}
                payment={calculatePayment()}
                onConfirm={handleFormSubmit}
                isFormValid={validated}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
