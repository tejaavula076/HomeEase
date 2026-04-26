import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const fallbackImages = {
  "Standard Cleaning":
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
  "Deep Cleaning":
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=900&q=80",
  "Move-In/Move-Out Cleaning":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  "Post-Construction Cleaning":
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80"
};

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((response) => setServices(response.data))
      .catch((error) => console.log("Error fetching services:", error));
  }, []);

  const getImage = (service) => {
    return service.image || fallbackImages[service.name] || fallbackImages["Standard Cleaning"];
  };

  return (
    <div className="container py-5">
      <h2 className="page-title text-center">Our Cleaning Services</h2>
      <p className="text-center text-muted mb-5">
        Choose a service and book your appointment easily.
      </p>

      <div className="row g-4">
        {services.map((service) => (
          <div className="col-md-4" key={service._id}>
            <div className="card-custom h-100">
              <img
                src={getImage(service)}
                alt={service.name}
                className="service-img"
              />

              <div className="p-4">
                <h4>{service.name}</h4>
                <p className="text-muted">{service.description}</p>
                <p>
                  <strong>Category:</strong> {service.category}
                </p>
                <h3 className="text-primary">${service.price}</h3>

                <Link to="/booking" state={{ service }} className="btn btn-primary w-100 mt-2">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;