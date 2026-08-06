import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Cultures", to: "/cultures" },
  { label: "Gallery", to: "/gallery" },
];

const extraLinks = [
  { label: "Festivals", to: "/festivals" },
  { label: "Foods", to: "/foods" },
  { label: "Museum", to: "/museum" },
  { label: "Tourism", to: "/tourism" },
  { label: "Map", to: "/map" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (
        !target.closest(".nav-dropdown") &&
        !target.closest(".more-button") &&
        !target.closest(".mobile-menu") &&
        !target.closest(".hamburger-button")
      ) {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        className="hamburger-button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-expanded={mobileOpen}
        aria-label="Open navigation menu"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="nav-links-right">
        {primaryLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            {item.label}
          </NavLink>
        ))}

        <div className="nav-dropdown">
          <button
            type="button"
            className="nav-link more-button"
            onClick={() => setMenuOpen((open) => !open)}
          >
            More <span className="dropdown-arrow">{menuOpen ? "▴" : "▾"}</span>
          </button>
          {menuOpen && (
            <div className="dropdown-panel">
              {extraLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          {[...primaryLinks, ...extraLinks].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link mobile-link${isActive ? " active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
