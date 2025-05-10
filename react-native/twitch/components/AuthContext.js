import React, { createContext, useState, useEffect } from 'react';

// Создаем контекст
export const AuthContext = createContext();

// Провайдер для передачи токена
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  // Можно инициализировать токен при монтировании или обновлять его
  useEffect(() => {
    // Вызовите функцию, которая получит токен из api.js или другого источника
    // Например, импортируйте функцию refreshAccessToken и вызовите ее
    const initializeToken = async () => {
      try {
        await refreshAccessToken(); // Импортируйте из api.js
        // После обновления токена, установите его в состояние
        setAccessToken(api.defaults.headers['Authorization'].split(' ')[1]);
      } catch (error) {
        console.error('Ошибка при инициализации токена', error);
      }
    };
    initializeToken();
  }, []);

  // Объявляем функцию для обновления токена из api.js
  const updateToken = async () => {
    await refreshAccessToken();
    setAccessToken(api.defaults.headers['Authorization'].split(' ')[1]);
  };

  return (
    <AuthContext.Provider value={{ accessToken, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};
