import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation(); 

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🌱</span>
          <span>Clean <span className="logo-text-green">Track</span></span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link to="/report" className={location.pathname === "/report" ? "active" : ""}>
            Report
          </Link>
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
            Dashboard
          </Link>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;