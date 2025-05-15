import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddStreamerButton from './AddStreamerButton2'; 


const StreamCard = ({ item, onPressStreamer }) => {
  const [isStreamerAdded, setIsStreamerAdded] = useState(false); // флаг, добавлен ли стример
  const [streamerData, setStreamerData] = useState(null);
  const [streamerList, setStreamerList] = useState([]); // список добавленных стримеров



  
  useEffect(() => {
    loadStreamerList();
  }, []);
  const loadStreamerList = async () => {
    try {
      const storedList = await AsyncStorage.getItem('streamerList');
      const list = storedList ? JSON.parse(storedList) : [];
      setStreamerList(list);
    } catch (error) {
      console.error('Ошибка при загрузке списка:', error);
    }
  };
  // Обновляем флаг, когда streamData или список меняется
  useEffect(() => {
    if (streamerData && streamerData.user) {
      const isAddedForChannel = streamerList.includes(item.user_login);

      setIsStreamerAdded(isAdded);
    } else {
      setIsStreamerAdded(false);
    }
  }, [streamerData, streamerList]);

  const handleAddStreamer = async (login) => {
    try {
      const storedList = await AsyncStorage.getItem('streamerList');
      let list = storedList ? JSON.parse(storedList) : [];
      
      if (!list.includes(login)) {
        list.push(login);
        await AsyncStorage.setItem('streamerList', JSON.stringify(list));
        setStreamerList(list);
        // Можно показывать уведомление
      } else {
        // Стример уже есть
      }
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    }
  };



  const truncateDescription = (description, maxLength = 34) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + '...';
  };

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.thumbnail_url }} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.description}>{truncateDescription(item.description)}</Text>
<View style={styles.viewContainer}>   
<AddStreamerButton
  isAdded={streamerList.includes(item.user_login)}
  onAdd={() => handleAddStreamer(item.user_login)}
/> 
   <View    style={styles.viewContainerInner} >  
      <Ionicons name="eye" size={15} color="gray" /> 
       <Text style={styles.viewContainerInnerText}>{item.viewer_count}</Text>
      </View>
     </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onPressStreamer}
        >
          <Text style={styles.buttonText}>{item.user_name}</Text>
         
        </TouchableOpacity>
 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainerInnerText: {
fontSize:13,
  },
  viewContainerInner: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems:'flex-end',
    gap:5
  },
  viewContainer: {
    flex: 1,
flexDirection:'row',
justifyContent: 'space-between',
alignItems:'center',
marginBottom:10,
alignContent:'space-between',

  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    maxWidth: '48%',
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  viewers: {
    fontSize: 14,
    marginBottom: 8,
    color: 'gray',
  },
  button: {
    backgroundColor: '#8c3fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default StreamCard;
