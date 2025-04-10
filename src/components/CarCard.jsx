//this component acccepts a (car) prop and displays its data inside a card
import { Link } from "react-router-dom";
function CarCard({ car, isWishlisted, onToggleWishlist }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <Link
          to={`/cars/${car.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img src={car.image} alt={car.name} className="card-img-top" />
        </Link>

        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <Link
              to={`/cars/${car.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h5 className="card-title mb-0">{car.name}</h5>
            </Link>

            <button
              className="btn btn-sm float-end"
              onClick={(e) => {
                e.preventDefault; //prevent navigation from <LINK>
                onToggleWishlist(car.id);
              }} //toggle when clicked
            >
              {isWishlisted ? "💖" : "🤍"}
            </button>
          </div>

          <p className="card-text">
            <strong>Brand:</strong> {car.brand}
            <br />
            <strong>Fuel:</strong> {car.fuelType}
            <br />
            <strong>Seating:</strong> {car.seatingCapacity}
            <br />
            <strong>Price:</strong> ₹{car.price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
