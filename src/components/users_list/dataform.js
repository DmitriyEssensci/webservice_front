// Form.js
import React from "react";

const Form = ({ onSubmit, isSubmitting, fullName, setFullName, city, setCity, postalCode, setPostalCode }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(fullName, city, postalCode);
  };

  return (
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
  );
};

export default Form;