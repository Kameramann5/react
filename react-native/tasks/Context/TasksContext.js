import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [news, setNews] = useState([]);

  const deleteAllTasks = () => {
   // очищаем список задач


    Alert.alert(
      'Подтверждение удаления',
      'Вы уверены, что хотите удалить все задачи?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            setNews([]); 
            // Предполагается, что у вас есть доступ к navigation
            // например, через useNavigation() или переданный пропс
                     },
        },
      ],
      { cancelable: true }
    );
  };

  // другие функции для добавления/обновления задач

  return (
    <TasksContext.Provider value={{ news, setNews, deleteAllTasks }}>
      {children}
    </TasksContext.Provider>
  );
};