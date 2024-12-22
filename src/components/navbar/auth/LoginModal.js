import React, { useState } from "react";
import "../Modal.css";

const LoginModal = ({ onClose, onLogin }) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Ошибка входа. Проверьте имя пользователя или пароль.");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      onLogin({ username: data.username });
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Имя пользователя"
            value={loginData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Войти</button>
        </form>
        <button onClick={onClose} className="close-button">
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default LoginModal;