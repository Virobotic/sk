import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const primaryLinks = [
  { label: "Home", to: "/", icon: "mdi:home-outline" },
  { label: "Cultures", to: "/cultures", icon: "mdi:palette-outline" },
  { label: "Festivals", to: "/festivals", icon: "mdi:party-popper" },
  { label: "Tourism", to: "/tourism", icon: "mdi:map-marker-radius-outline" },
];

const extraLinks = [
  { label: "Languages", to: "/languages", icon: "mdi:translate" },
  { label: "About", to: "/about", icon: "mdi:information-outline" },
  { label: "Foods", to: "/foods", icon: "mdi:food-fork-drink" },
  { label: "Museum", to: "/museum", icon: "mdi:image-multiple-outline" },
  { label: "Map", to: "/map", icon: "mdi:map-outline" },
  { label: "Admin", to: "/admin", icon: "mdi:shield-account-outline" },
  { label: "Contact", to: "/contact", icon: "mdi:email-outline" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const useDarkTheme = localStorage.getItem("sk-theme") === "dark";
    setDarkMode(useDarkTheme);
    document.documentElement.dataset.theme = useDarkTheme ? "dark" : "light";
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.closest(".nav-dropdown") && !target.closest(".mobile-menu") && !target.closest(".hamburger-button")) {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !darkMode;
    setDarkMode(nextIsDark);
    document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
    localStorage.setItem("sk-theme", nextIsDark ? "dark" : "light");
  };

  return (
    <header className={`navbar${location.pathname === "/" ? " home-navbar" : ""}`}>
      <div className="brand-left">
        <div className="brand-logo">SK</div>
        <div className="brand-text"><span>Southern Kaduna</span><p>Culture & Heritage</p></div>
      </div>

      <nav className="nav-links-right" aria-label="Primary navigation">
        {primaryLinks.map((item) => (
          <NavLink 
            key={item.to} 
            to={item.to} 
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            title={item.label}
          >
            <span className="iconify nav-icon" data-icon={item.icon} aria-hidden="true" />
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
        <div className="nav-dropdown">
          <button type="button" className="nav-link more-button" onClick={() => setMenuOpen((open) => !open)} title="More options">
            <span className="iconify nav-icon" data-icon="mdi:dots-horizontal" aria-hidden="true" />
            <span className="dropdown-arrow">{menuOpen ? "▴" : "▾"}</span>
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
                  <span className="iconify nav-icon" data-icon={item.icon} aria-hidden="true" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="navbar-actions">
        <NavLink to="/contact" className="nav-visit-link" title="Plan your visit">
          <span className="iconify nav-icon" data-icon="mdi:calendar-month-outline" aria-hidden="true" />
          <span>Plan your visit</span>
        </NavLink>
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={darkMode ? "Use light mode" : "Use dark mode"} title={darkMode ? "Use light mode" : "Use dark mode"}>
          <span className="iconify theme-icon" data-icon={darkMode ? "mdi:weather-sunny" : "mdi:weather-night"} aria-hidden="true" />
        </button>
        <button type="button" className="hamburger-button" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label="Open navigation menu"><span /><span /><span /></button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          {[...primaryLinks, ...extraLinks, { label: "Plan your visit", to: "/contact", icon: "mdi:calendar-month-outline" }].map((item) => (
            <NavLink 
              key={item.to} 
              to={item.to} 
              className={({ isActive }) => `nav-link mobile-link${isActive ? " active" : ""}`} 
              onClick={() => setMobileOpen(false)}
            >
              <span className="iconify nav-icon" data-icon={item.icon} aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
