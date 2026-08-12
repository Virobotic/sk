import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "Cultures", to: "/cultures" },
  { label: "Festivals", to: "/festivals" },
  { label: "Tourism", to: "/tourism" },
];

const extraLinks = [
  { label: "Languages", to: "/languages" },
  { label: "About", to: "/about" },
  { label: "Foods", to: "/foods" },
  { label: "Museum", to: "/museum" },
  { label: "Map", to: "/map" },
  { label: "Contact", to: "/contact" },
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
        {primaryLinks.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>{item.label}</NavLink>)}
        <div className="nav-dropdown">
          <button type="button" className="nav-link more-button" onClick={() => setMenuOpen((open) => !open)}>More <span className="dropdown-arrow">{menuOpen ? "▴" : "▾"}</span></button>
          {menuOpen && <div className="dropdown-panel">{extraLinks.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} onClick={() => setMenuOpen(false)}>{item.label}</NavLink>)}</div>}
        </div>
      </nav>

      <div className="navbar-actions">
        <NavLink to="/contact" className="nav-visit-link">Plan your visit <span>↗</span></NavLink>
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={darkMode ? "Use light mode" : "Use dark mode"} title={darkMode ? "Use light mode" : "Use dark mode"}><span aria-hidden="true">{darkMode ? "☀" : "◐"}</span></button>
        <button type="button" className="hamburger-button" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label="Open navigation menu"><span /><span /><span /></button>
      </div>

      {mobileOpen && <div className="mobile-menu">{[...primaryLinks, ...extraLinks, { label: "Plan your visit", to: "/contact" }].map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link mobile-link${isActive ? " active" : ""}`} onClick={() => setMobileOpen(false)}>{item.label}</NavLink>)}</div>}
    </header>
  );
}
