//импорты библиотек и компонентов
import "./App.scss";
import React, { useState, useEffect } from "react";
import ProductCard from "./components/Card";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// PAGES
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";
import RegisterStore from "./pages/RegisterStore";
import Markets from "./pages/Markets";
import ProductPage from "./pages/Product";

// import slice
import { selectIsLogged, fetchMe, userId } from "./app/slices/authSlice";
import Favourites from "./pages/Favourites";

function App() {
  const [registerStore, setRegisterStore] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const isLogged = useSelector(selectIsLogged);
  const id = useSelector(userId);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsAuth(Boolean(window.localStorage.getItem("token")));
    if (id !== undefined) dispatch(fetchMe({id}));
  }, [isLogged]);
  return (
    <>
      <Navbar />
      <div className="app">
        <Routes>
          {/* // Routes */}
          <Route path="/card" element={<ProductCard />} />
          <Route
            path="/login"
            element={isAuth || isLogged ? <Navigate to="/main" /> : <Login />}
          />
          <Route
            path="/register"
            element={
              registerStore ? (
                <RegisterStore setRegisterStore={setRegisterStore} />
              ) : (
                <Register setRegisterStore={setRegisterStore} />
              )
            }
          />
          <Route
            path="/main"
            element={isAuth || isLogged ? <Main /> : <Navigate to="/login" />}
          />
          <Route
            path="/markets"
            element={
              isAuth || isLogged ? <Markets /> : <Navigate to="/login" />
            }
          />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route
            path="*"
            element={<Navigate to={isAuth || isLogged ? "/main" : "/login"} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
