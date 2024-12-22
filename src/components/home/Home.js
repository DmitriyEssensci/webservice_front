import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1>Добро пожаловать на сайт!</h1>
      <p>Нажмите кнопку ниже, чтобы перейти на страницу управления пользователями.</p>
      <Link to="/users/">
        <button>Перейти к пользователям</button>
      </Link>
    </div>
  );
};

export default Home;