import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";
import "./Modal.css";

const NavBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">На главную</Link>
        <Link to="/users/">Пользователи</Link>
      </div>
      <div className="auth-buttons">
        {currentUser ? (
          <>
            <span>Вы вошли как: {currentUser.username}</span>
            <button onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <>
            <button onClick={() => setShowLoginModal(true)}>Войти</button>
            <button onClick={() => setShowRegisterModal(true)}>Зарегистрироваться</button>
          </>
        )}
      </div>
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </nav>
  );
};

export default NavBar;