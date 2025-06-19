import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SwitchContext = createContext();

export const SwitchProvider = ({ children }) => {
  const [Minimalizm, setMinimalizm] = useState(false);

  // Загрузка состояния при монтировании провайдера
  useEffect(() => {
    const loadState = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('miniplayerSwitch');
        if (storedValue !== null) {
            setMinimalizm(JSON.parse(storedValue));
        }
      } catch (e) {
        console.error('Ошибка при загрузке состояния:', e);
      }
    };

    loadState();
  }, []);

  // Функция для изменения состояния и сохранения его
const toggleSwitch = async () => {
  const newValue = !Minimalizm;
  console.log('Переключение, новое значение:', newValue);
  setMinimalizm(newValue);
  try {
    await AsyncStorage.setItem('miniplayerSwitch', JSON.stringify(newValue));
  } catch (e) {
    console.error('Ошибка при сохранении состояния:', e);
  }
};

  return (
    <SwitchContext.Provider value={{ Minimalizm, toggleSwitch }}>
      {children}
    </SwitchContext.Provider>
  );
};