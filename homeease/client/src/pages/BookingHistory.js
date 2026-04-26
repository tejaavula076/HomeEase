import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../components/Popup";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "success"
  });

  const closePopup = () => {
    setPopup({ ...popup, show: false });
  };

  useEffect(() => {
    const fetchBookings = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        setPopup({
          show: true,
          title: "Login Required",
          message: "Please login to view your bookings.",
          type: "error"
        });
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/bookings/my",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`
            }
          }
        );

        setBookings(response.data);

        if (response.data.length === 0) {
          setPopup({
            show: true,
            title: "No Bookings",
            message: "You have not made any bookings yet.",
            type: "error"
          });
        } else {
          setPopup({
            show: true,
            title: "Bookings Loaded",
            message: "Your bookings have been loaded successfully.",
            type: "success"
          });
        }
      } catch (error) {
        setPopup({
          show: true,
          title: "Error",
          message: "Failed to load bookings.",
          type: "error"
        });
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="container py-5">
      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={closePopup}
      />

      <h2 className="page-title text-center mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-muted">No bookings found.</p>
      ) : (
        <div className="row g-4">
          {bookings.map((booking) => (
            <div className="col-md-6" key={booking._id}>
              <div className="card-custom p-4">
                <h4>{booking.services?.[0]?.name}</h4>
                <p><strong>Date:</strong> {booking.bookingDate}</p>
                <p><strong>Time:</strong> {booking.bookingTime}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Total:</strong> ${booking.totalAmount}</p>
                <span className="badge bg-warning text-dark">
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingHistory;