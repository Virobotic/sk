import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Cultures", to: "/cultures" },
  { label: "Festivals", to: "/festivals" },
  { label: "Foods", to: "/foods" },
  { label: "Gallery", to: "/gallery" },
  { label: "Museum", to: "/museum" },
  { label: "Tourism", to: "/tourism" },
  { label: "Tribes", to: "/tribes" },
  { label: "Map", to: "/map" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="brand-left">
        <div className="brand-logo">SK</div>
        <div className="brand-text">
          <span>Southern Kaduna</span>
          <p>Minimal heritage guide</p>
        </div>
      </div>

      <button
        type="button"
        className={`nav-toggle${isOpen ? " open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links-right${isOpen ? " open" : ""}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        <NavLink
          to="/tribes"
          className={({ isActive }) =>
            `nav-link nav-link-cta${isActive ? " active" : ""}`
          }
          onClick={() => setIsOpen(false)}
        >
          Explore tribes
        </NavLink>
      </nav>
    </header>
  );
}
