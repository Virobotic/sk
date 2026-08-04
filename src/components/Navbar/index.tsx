import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Cultures", to: "/cultures" },
  { label: "Festivals", to: "/festivals" },
  { label: "Foods", to: "/foods" },
  { label: "Gallery", to: "/gallery" },
  { label: "Museum", to: "/museum" },
  { label: "Tourism", to: "/tourism" },
  { label: "Map", to: "/map" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="brand-left">
        <div className="brand-logo">SK</div>
        <div className="brand-text">
          <span>Southern Kaduna</span>
          <p>Culture & Heritage</p>
        </div>
      </div>

      <div className="nav-center-space" />

      <nav className="nav-links-right">
        {navItems.map((item) => {
          const iconMap: Record<string, string> = {
            Home: "mdi:home",
            Cultures: "mdi:account-group",
            Festivals: "mdi:party-popper",
            Foods: "mdi:food",
            Gallery: "mdi:image-multiple",
            Museum: "mdi:bank-museum",
            Tourism: "mdi:binoculars",
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
