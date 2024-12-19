import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';

const WebSocketComponent = () => {
  const [message, setMessage] = useState(''); // Текущее сообщение
  const [messages, setMessages] = useState([]); // История сообщений

  // Подключаем WebSocket
  const { sendMessage, lastMessage } = useWebSocket('ws://localhost:8000/ws', {
    onOpen: () => console.log('WebSocket подключен'),
    onClose: () => console.log('WebSocket отключен'),
    shouldReconnect: () => true, // Автоматическое переподключение
  });

  // Обновляем список сообщений, когда приходит новое
  React.useEffect(() => {
    if (lastMessage) {
      setMessages((prevMessages) => [...prevMessages, lastMessage.data]);
    }
  }, [lastMessage]);

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Чат через WebSocket</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите сообщение"
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSend}>Отправить</button>
      </div>
      <div>
        <h2>Сообщения:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketComponent;