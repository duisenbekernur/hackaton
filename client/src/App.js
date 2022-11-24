//импорты библиотек и компонентов
import "./App.scss";
import React, { useState } from "react";
import ProductCard from "./components/Card";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";

// импорты страниц
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";
import RegisterStore from "./pages/RegisterStore";
import Markets from "./pages/Markets";

function App() {
  const [isLogged, setIsLogged] = useState(true);
  const [registerStore, setRegisterStore] = useState(false);
  return (
    <>
      <Navbar />
      <div className="app">
        <Routes>
          // Роутинг
          <Route path="/card" element={<ProductCard />} />
          <Route
            path="/login"
            element={isLogged ? <Navigate to="/main" /> : <Login />}
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
            element={isLogged ? <Main /> : <Navigate to="/login" />}
          />
          <Route
            path="/markets"
            element={isLogged ? <Markets /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={isLogged ? "/main" : "/login"} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
