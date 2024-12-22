import React from "react";

const UsersList = ({ users, onDelete }) => {
  return (
    <div>
      <h2>Список пользователей</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <span>{user.full_name}</span> - {user.city} - {user.postal_code}
              <button onClick={() => onDelete(user.id)} style={styles.deleteButton}>
                🗑 Удалить
              </button>
            </li>
          ))
        ) : (
          <p>Нет пользователей для отображения</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  deleteButton: {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    marginLeft: "10px",
    transition: "background-color 0.3s",
  },
};

export default UsersList;