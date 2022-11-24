import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menu from "../../const/menu";
import menuUrl from "../../const/menuUrl";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(0);

  const getIndexOfActiveMenu = () => {
    setActiveMenu(menuUrl.indexOf(window.location.pathname.replace("/", "")));
  };

  useEffect(() => {
    getIndexOfActiveMenu();
  }, []);

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {menu.map((item, index) => (
              <li>
                <Link
                  to={`/${menuUrl[index]}`}
                  onClick={() => setActiveMenu(index)}
                  className={`nav-link px-2 text-${
                    activeMenu === index ? "light" : "secondary"
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-dark text-bg-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            <Link to="/login">
              <button type="button" className="btn btn-outline-light me-2">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button type="button" className="btn btn-warning">
                Sign-up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
