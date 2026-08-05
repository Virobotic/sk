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
          <p>Culture & Heritage</p>
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
        {navItems.map((item) => {
          const iconMap: Record<string, string> = {
            Home: "mdi:home",
            Cultures: "mdi:account-group",
            Festivals: "mdi:party-popper",
            Foods: "mdi:food",
            Gallery: "mdi:image-multiple",
            Museum: "mdi:bank-museum",
            Tourism: "mdi:binoculars",
            Tribes: "mdi:people-group",
            Map: "mdi:map-marker",
            Contact: "mdi:email",
          };
          const icon = iconMap[item.label] || "mdi:circle";
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="iconify" data-icon={icon} data-inline="false" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}
