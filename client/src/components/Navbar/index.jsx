import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react";
import menu from "../../const/menu";
import menuUrl from "../../const/menuUrl";

import { selectIsLogged, user } from "../../app/slices/authSlice";
import { changeValue } from "../../app/slices/searchProductSlice";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activeMenu, setActiveMenu] = useState(0);
  const [isAuth, setIsAuth] = useState(false);

  const dispatch = useDispatch();

  const isLogged = useSelector(selectIsLogged);
  const userDatas = useSelector(user);

  const logout = () => {
    window.localStorage.clear();
    window.location.pathname = "/login";
  };

  const getIndexOfActiveMenu = () => {
    setActiveMenu(menuUrl.indexOf(window.location.pathname.replace("/", "")));
  };

  useEffect(() => {
    getIndexOfActiveMenu();
    setIsAuth(Boolean(window.localStorage.getItem("token")));
  }, []);

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {menu.map((item, index) => (
              <li key={index}>
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
            <li>
              <form
                className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 mx-4"
                role="search"
              >
                <input
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    dispatch(changeValue(searchValue));
                  }}
                  type="search"
                  className="form-control form-control-dark text-bg-light"
                  placeholder="Search..."
                  aria-label="Search"
                />
              </form>
            </li>
          </ul>

          {!isLogged && !isAuth ? (
            <div className="text-end">
              <Link to="/login">
                <button type="button" className="btn btn-outline-light me-2">
                  Войти
                </button>
              </Link>
              <Link to="/register">
                <button type="button" className="btn btn-warning">
                  Регистрация
                </button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/favourites">
                <img width={30} src="/uploads/favourite.png" alt="" />
              </Link>
              <h3 style={{ marginLeft: "25px" }}>{userDatas?.name}</h3>
              <Button
                colorScheme="red"
                style={{ margin: "0 0 0 55px" }}
                onClick={logout}
              >
                Выйти
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
