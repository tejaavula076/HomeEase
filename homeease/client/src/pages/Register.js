import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [popup, setPopup] = useState({
    show: false,
    title: "",
    message: "",
    type: "success"
  });

  const navigate = useNavigate();

  const closePopup = () => {
    setPopup({ ...popup, show: false });

    if (popup.type === "success") {
      navigate("/services");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      localStorage.setItem("userInfo", JSON.stringify(response.data));

      setPopup({
        show: true,
        title: "Registration Successful",
        message: "Your HomeEase account has been created.",
        type: "success"
      });
    } catch (error) {
      setPopup({
        show: true,
        title: "Registration Failed",
        message: "This email may already exist. Please try another email.",
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

      <div className="form-box mx-auto" style={{ maxWidth: "450px" }}>
        <h2 className="page-title text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="btn btn-success w-100" type="submit">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;