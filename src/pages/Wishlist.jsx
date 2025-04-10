import { useState, useEffect } from "react";
// import carData from "../data/cars";
import CarCard from "../components/CarCard";
import axios from "axios";

function Wishlist() {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [cars, setCars] = useState([]);

  //   FEtch all cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get(
          "https://67f7a03e2466325443ea01b5.mockapi.io/api/cars"
        );
        setCars(res.data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    fetchCars();
  }, []);

  // Filter only wishlisted cars from full carData(API)
  const wishlistedCars = cars.filter((car) => wishlist.includes(car.id));

  const toggleWishlist = (carId) => {
    let updated;
    if (wishlist.includes(carId)) {
      updated = wishlist.filter((id) => id !== carId);
    } else {
      updated = [...wishlist, carId];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="container mt-4">
      <h2> Your Wishlist</h2>
      {wishlistedCars.length === 0 ? (
        <p>No cars in your wishlist yet.</p>
      ) : (
        <div className="row mt-3">
          {wishlistedCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isWishlisted={wishlist.includes(car.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
