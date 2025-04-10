import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {" "}
          Car Finder
        </Link>
        <Link to="/wishlist" className="btn btn-outline-primary">
          Wishlist 💖
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
