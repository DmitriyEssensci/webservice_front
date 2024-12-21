import React, { useState } from "react";

const App = () => {
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!fullName || !city || !postalCode) {
      setStatus({ type: "error", message: "Все поля должны быть заполнены!" });
      return false;
    }
    if (!/^\d+$/.test(postalCode)) {
      setStatus({ type: "error", message: "Индекс должен содержать только цифры!" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
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
        console.log({ fullName, city, postalCode });
        throw new Error("Ошибка при отправке данных.");
      }

      const data = await response.json();
      setStatus({ type: "success", message: "Данные успешно отправлены!" });
      console.log(data);

      // Сброс значений полей
      setFullName("");
      setCity("");
      setPostalCode("");
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ФИО"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Город"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Индекс"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Отправка..." : "Отправить"}
        </button>
      </form>

      {/* Статус сообщения */}
      {status && (
        <p
          style={{
            color: status.type === "success" ? "green" : "red",
          }}
        >
          {status.message}
        </p>
      )}
    </div>
  );
};

export default App;