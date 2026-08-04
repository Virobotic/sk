import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Cultures", to: "/cultures" },
  { label: "Festivals", to: "/festivals" },
  { label: "Foods", to: "/foods" },
  { label: "Gallery", to: "/gallery" },
  { label: "Museum", to: "/museum" },
  { label: "Tourism", to: "/tourism" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="brand">
        <span>Southern Kaduna</span>
        <p>Culture & Heritage</p>
      </div>

      <nav className="nav-links">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className="nav-link">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
