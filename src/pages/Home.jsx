import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import CarCard from "../components/CarCard";
// import carData from "../data/cars";

function Home() {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  //   Loading State
  const [loading, setLoading] = useState(true);

  const [cars, setCars] = useState([]); //full list
  const [filters, setFilters] = useState({});
  const [filteredCars, setFilteredCars] = useState([]); //filtered list

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  useEffect(() => {
    setLoading(true); //show spinner before fetching
    fetch("https://67f7a03e2466325443ea01b5.mockapi.io/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setFilteredCars(data); //init full + filtered lists
        setLoading(false); // hide spinner after data loads
      })
      .catch((err) => {
        console.error("Error fetching cars:", err);
        setLoading(false); //hide sipnner on error
      });
  }, []);

  //   Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); //scroll smoothly to top
  }, [currentPage]); //Only run when page no. changes

  const [wishlist, setWishlist] = useState(() => {
    // Load from Local Storage if exists
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Search Functionality
  const [searchTerm, setSearchTerm] = useState("");

  //   Sorting Functionality
  const [sortOption, setSortOption] = useState("");

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Filters Updated:", newFilters);
  };

  const toggleWishlist = (carId) => {
    let updated;
    if (wishlist.includes(carId)) {
      updated = wishlist.filter((id) => id !== carId); //remove if already added
    } else {
      updated = [...wishlist, carId]; //add if not present
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated)); //save to local-storage
  };

  // Filter Logic
  useEffect(() => {
    let updated = [...cars]; //start with full car list

    //Filter by Brand
    if (filters.brand) {
      updated = updated.filter((car) => car.brand === filters.brand); //only keeps cars that match selected brand
    }

    // Filter by Price Range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-"); //to split the string eg:(50000-70000)
      updated = updated.filter((car) => {
        const price = car.price;
        return max ? price >= +min && price <= +max : price >= +min;
      });
    }

    // Filter by Fuel Type
    if (filters.fuelType) {
      updated = updated.filter((car) => car.fuelType === filters.fuelType); //only keep cars that match the fuel type
    }

    // Filter by Seating Capacity
    if (filters.seatingCapacity) {
      updated = updated.filter(
        (car) => car.seatingCapacity === +filters.seatingCapacity
      ); //matches with exact seat count (convert filter from string to num with +)
    }

    // Search Filter
    if (searchTerm) {
      updated = updated.filter(
        (car) =>
          car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Sort by Option
    if (sortOption === "PriceLowHigh") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === "PriceHighLow") {
      updated.sort((a, b) => b.price - a.price);
    }

    //Store final filtered result in state
    setFilteredCars(updated); //triggers re-render with updated list
  }, [filters, searchTerm, sortOption]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Find your Car</h2>

      <div className="card p-3 mb-4 shadow-sm">
        <div className="row align-items-end gy-2">
          <div className="col-md-9">
            <FilterBar onFilterChange={handleFilterChange} />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder=" Search by name or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="form-select my-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="PriceLowHigh">Price: Low to High</option>
            <option value="PriceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading cars...</p>
        </div>
      ) : filteredCars.length > 0 ? (
        <div className="row mt-4">
          {currentCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isWishlisted={wishlist.includes(car.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-outline-primary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ◄ Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              className="btn btn-outline-primary"
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < Math.ceil(filteredCars.length / carsPerPage)
                    ? prev + 1
                    : prev
                )
              }
              disabled={
                currentPage === Math.ceil(filteredCars.length / carsPerPage)
              }
            >
              Next ►
            </button>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning w-100 text-center">
          <h5>No cars found matching your criteria.</h5>
        </div>
      )}
    </div>
  );
}

export default Home;
