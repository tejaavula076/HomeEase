import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Popup from "./Popup";

function Navbar() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "success"
  });

  const handleLogout = () => {
    localStorage.removeItem("userInfo");

    setPopup({
      show: true,
      title: "Logged Out",
      message: "You have been logged out successfully.",
      type: "success"
    });
  };

  const closePopup = () => {
    setPopup({ ...popup, show: false });
    navigate("/login");
  };

  return (
    <>
      <Popup
        show={popup.show}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        onClose={closePopup}
      />

      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <Link className="navbar-brand text-primary" to="/">
          HomeEase
        </Link>

        <div className="navbar-nav ms-auto align-items-center gap-2">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/services">Services</Link>
          <Link className="nav-link" to="/booking">Book</Link>
          <Link className="nav-link" to="/history">My Bookings</Link>

          {userInfo ? (
            <>
              <span className="text-muted ms-2">Hi, {userInfo.name}</span>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-primary btn-sm" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary btn-sm" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;