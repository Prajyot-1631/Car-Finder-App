import { useParams, useNavigate } from "react-router-dom";
// import carData from "../data/cars";
import { useEffect, useState } from "react";

function CarDetails() {
  const { id } = useParams(); // gives us dynamic id (as a string ) from the URL
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  ); //track wishlist from storage

  useEffect(() => {
    fetch(`https://67f7a03e2466325443ea01b5.mockapi.io/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.error("Failed to fetch car:", err));
  }, []);

  if (!car) return <p className="text-center mt-5">Car not Found.</p>;

  const isWishlisted = wishlist.includes(car.id); // check if car is wishlisted

  //Toggel function
  const handleToggle = () => {
    // Check if car is already in wishlist
    const updated = isWishlisted
      ? wishlist.filter((id) => id !== car.id) // if yes: remove the car (keep all id's except this)
      : [...wishlist, car.id]; //if no: add the car's id to the wishlist

    setWishlist(updated); //update the wishlist in React State so that the UI can reflect the change.
    localStorage.setItem("wishlist", JSON.stringify(updated)); // save the wishlist to local storage(stays even if rrefreshing/closing the browser)
  };

  return (
    <>
      <div className="container mt-4">
        <button className="btn btn-light mb-3" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="card p-4 shadow">
          <div className="row">
            {/* Car Image */}
            <div className="col-md-6">
              <img
                className="img-fluid rounded"
                src={car.image}
                alt={car.name}
                style={{ maxHeight: "350px", objectFit: "cover" }}
              />
            </div>

            {/* Car Info */}
            <div className="col-md-6 mt-4 mt-md-0">
              <h3 className="d-flex justify-content-between align-items-center">
                {car.name}
                <button
                  className="btn border-0"
                  style={{ fontSize: "1.5rem", background: "none" }}
                  onClick={handleToggle}
                >
                  {isWishlisted ? "💖" : "🤍"}
                </button>
              </h3>

              <hr />

              <p>
                <strong>Brand:</strong> {car.brand}
              </p>
              <p>
                <strong>Fuel Type:</strong> {car.fuelType}
              </p>
              <p>
                <strong>Seating Capacity:</strong> {car.seatingCapacity}
              </p>
              <p>
                <strong>Price:</strong> ₹{car.price.toLocaleString()}
              </p>

              <div className="mt-3">
                <p>
                  <strong>Description:</strong>
                </p>
                <p>{car.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CarDetails;
