import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cultures">Cultures</Link>
      <Link to="/festivals">Festivals</Link>
      <Link to="/tourism">Tourism</Link>
      <Link to="/foods">Foods</Link>
      <Link to="/museum">Museum</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
