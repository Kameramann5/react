import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>

        <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('StreamerSearch')}
      >
        <Text style={styles.linkText}>Поиск</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('TopStreams')}
      >
        <Text style={styles.linkText}>Топ стримеров</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('TwitchAuth')}
      >
        <Text style={styles.linkText}>Вход</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff', // или любой цвет, который нужен
  },
  navItem: {
  },
  linkText: {
    marginTop:20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color: 'blue', // или любой цвет, который нужен
    color:'white',
    backgroundColor:'#8c3fff',
    padding:10
  },
});

export default Header;
