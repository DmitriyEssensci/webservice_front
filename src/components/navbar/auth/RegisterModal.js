import React, { useState } from "react";
import "../Modal.css";

const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    mail: "",
    phone_number: "",
    secret_question: "Как зовут вашего первого питомца?",
    secret_answer: "",
    user_name: "",
  });

  const secretQuestions = [
    "Как зовут вашего первого питомца?",
    "Какое имя вашей матери?",
    "Какой ваш любимый фильм?",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert('Ошибка: ${errorData.detail}');
        return;
      }
  
      const data = await response.json();
      alert('Регистрация успешна! ID пользователя: ${data.user_id}');
      onClose();
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      alert("Произошла ошибка при отправке данных.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_name"
            placeholder="Имя пользователя"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="login"
            placeholder="Логин"
            value={formData.login}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="mail"
            placeholder="E-mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Телефон"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          <select
            name="secret_question"
            value={formData.secret_question}
            onChange={handleChange}
          >
            {secretQuestions.map((question, index) => (
              <option key={index} value={question}>
                {question}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="secret_answer"
            placeholder="Ответ на секретный вопрос"
            value={formData.secret_answer}
            onChange={handleChange}
            required
          />
          <button type="submit">Зарегистрироваться</button>
        </form>
        <button onClick={onClose} className="close-button">Закрыть</button>
      </div>
    </div>
  );
};

export default RegisterModal;