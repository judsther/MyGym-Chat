import { Link } from "react-router-dom";
import logoMGC from "../../../assets/images/logoMGC.png";
import "./Navbar.css";
import { LogOut } from "../../../hooks/LogOut/LogOut";

export const Navbar = () => {


  
  return (
    <>
      <nav className="navbar border-bottom border-body fixed-top navbar-expand-md navnav">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src={logoMGC}
              alt="Logo"
              width="75"
              className="d-inline-block align-text-top"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/Welcome" className="nav-link colortext">
                  Gimnasios
                </Link>
              </li>
              <li className="nav-item nav-link">
              <LogOut/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
