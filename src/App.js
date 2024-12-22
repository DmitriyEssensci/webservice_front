import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import UsersList from "./components/UsersList";
import './style.css';

const App = () => {
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users/");
      if (!response.ok) {
        throw new Error("Ошибка при загрузке списка пользователей.");
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (fullName, city, postalCode) => {
    if (!fullName || !city || !postalCode) {
      setStatus({ type: "error", message: "Все поля должны быть заполнены!" });
      return;
    }
    if (!/^\d+$/.test(postalCode)) {
      setStatus({ type: "error", message: "Индекс должен содержать только цифры!" });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ full_name: fullName, city: city, postal_code: postalCode }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных.");
      }

      setStatus({ type: "success", message: "Данные успешно отправлены!" });
      setFullName(""); setCity(""); setPostalCode(""); 
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при удалении пользователя');
      }
  
      const data = await response.json();
      console.log(data);  // Здесь будет сообщение об успешном удалении
      // Обновите состояние или выполните другие действия после удаления
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Добавление пользователя</h2>
      <Form
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        fullName={fullName}
        setFullName={setFullName}
        city={city}
        setCity={setCity}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
      />
      {status && (
        <p style={{ color: status.type === "success" ? "green" : "red" }}>
          {status.message}
        </p>
      )}
      <UsersList users={users} onDelete={handleDelete} />
      <footer>
        <p>Разработано <a href="https://gerbx.com">пуксичем</a></p>
      </footer>
    </div>
  );
};

export default App;