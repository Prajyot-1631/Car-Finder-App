import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Navbar from "./components/Navbar";
import CarDetails from "./pages/CarDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cars/:id" element={<CarDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
