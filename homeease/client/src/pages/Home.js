import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container hero-section">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="hero-title">Effortless Home Cleaning</h1>
            <p className="hero-text mt-3">
              Book trusted home cleaning services quickly, easily, and confidently with HomeEase.
            </p>

            <Link to="/services" className="btn btn-primary btn-lg mt-3">
              Explore Services
            </Link>
          </div>

          <div className="col-md-6 mt-4 mt-md-0">
            <img
              className="hero-img"
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
              alt="Home Cleaning"
            />
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <h2 className="page-title text-center mb-4">Why Choose HomeEase?</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card-custom p-4 text-center">
              <h4>Easy Booking</h4>
              <p>Schedule services in just a few clicks.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-custom p-4 text-center">
              <h4>Trusted Services</h4>
              <p>Reliable cleaning options for your home.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-custom p-4 text-center">
              <h4>Flexible Timing</h4>
              <p>Choose a date and time that works for you.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">© 2026 HomeEase. All rights reserved.</div>
    </>
  );
}

export default Home;