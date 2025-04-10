import { useState } from "react";

function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    brand: "",
    priceRange: "",
    fuelType: "",
    seatingCapacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; //gets name of filter and selected value
    const updatedFilters = { ...filters, [name]: value }; //update that filter in the filters object
    setFilters(updatedFilters); //update state
    onFilterChange(updatedFilters); //send filters to parent (Home.jsx)
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <div className="row g-3">
        <div className="col-md-3">
          <select name="brand" className="form-select" onChange={handleChange}>
            <option value="">Brand</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Tata">Tata</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            name="fuelType"
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            name="seatingCapacity"
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Seating</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
