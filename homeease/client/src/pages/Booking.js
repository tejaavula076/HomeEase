import { useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import Popup from "../components/Popup";

function Booking() {
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [address, setAddress] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "success"
  });

  const location = useLocation();
  const selectedService = location.state?.service;

  const fallbackImage =
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80";

  const closePopup = () => {
    setPopup({ ...popup, show: false });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo) {
      setPopup({
        show: true,
        title: "Login Required",
        message: "Please login before booking a service.",
        type: "error"
      });
      return;
    }

    if (!selectedService) {
      setPopup({
        show: true,
        title: "Service Required",
        message: "Please select a service first.",
        type: "error"
      });
      return;
    }

    const bookingData = {
      services: [
        {
          serviceId: selectedService._id,
          name: selectedService.name,
          price: selectedService.price,
          quantity: 1
        }
      ],
      totalAmount: selectedService.price,
      bookingDate,
      bookingTime,
      address
    };

    try {
      await axios.post("http://localhost:5000/api/bookings", bookingData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });

      setPopup({
        show: true,
        title: "Booking Confirmed",
        message: "Your service has been booked successfully.",
        type: "success"
      });

      setBookingDate("");
      setBookingTime("");
      setAddress("");
    } catch (error) {
      setPopup({
        show: true,
        title: "Booking Failed",
        message: "Something went wrong. Please try again.",
        type: "error"
      });
    }
  };

  return (
    <div className="container py-5">
      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={closePopup}
      />

      <h2 className="page-title text-center mb-4">Book Your Service</h2>

      {!selectedService ? (
        <div className="text-center">
          <p>Please select a service before booking.</p>
          <Link to="/services" className="btn btn-primary">
            Go to Services
          </Link>
        </div>
      ) : (
        <div className="row g-4 align-items-start">
          <div className="col-md-5">
            <div className="card-custom">
              <img
                src={selectedService.image || fallbackImage}
                alt={selectedService.name}
                className="service-img"
              />
              <div className="p-4">
                <h3>{selectedService.name}</h3>
                <p className="text-muted">{selectedService.description}</p>
                <h3 className="text-primary">${selectedService.price}</h3>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div className="form-box">
              <form onSubmit={handleBooking}>
                <div className="mb-3">
                  <label className="form-label">Booking Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Booking Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Service Address</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between border-top pt-3">
                  <strong>Total Amount</strong>
                  <strong>${selectedService.price}</strong>
                </div>

                <button className="btn btn-success w-100 mt-4" type="submit">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Booking;