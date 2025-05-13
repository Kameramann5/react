// StreamCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AddStreamerButton from './AddStreamerButton'; 

const StreamCard = ({ item, onPressStreamer }) => {
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
        <Text style={styles.viewers}>{item.viewer_count} зрителей</Text>
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
