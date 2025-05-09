import React from 'react';
import axios from 'axios';
import { StyleSheet,View, Text,Image} from 'react-native';
import { Loading } from '../components/Loading';



export const FullPostScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const { id, title } = route.params;

  React.useEffect(() => {
    navigation.setOptions({
      title,
    });
    axios
      .get('https://681dfc8ec1c291fa66328324.mockapi.io/articles/articles/' + id)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить статью');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Image source={{ uri: data.imageUrl }}   style={styles.postImage}    />
      <Text  style={styles.PostText}>{data.text}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  postImage: {
    borderRadius:10,
    width: '100%',
    height: 250,
  marginBottom:20,
  },
  PostText: {
fontSize:18,
lineHeight:24,
  }
});