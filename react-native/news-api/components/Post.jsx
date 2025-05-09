import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const truncateTitle = (str) => {
  if (typeof str !== 'string') {
    return '';
  }
  if (str.length >= 50) {
    return str.substring(0, 50) + '...';
  }
  return str;
};

export const Post = ({ title, imageUrl, createdAt }) => {
  return (
    <View style={styles.postView}>
      <Image source={{ uri: imageUrl }} style={styles.postImage} />
      <View style={styles.postDetails}>
        <Text style={styles.postTitle}>{truncateTitle(title)}</Text>
        <Text style={styles.postDate}>{new Date(createdAt).toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postView: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  postImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  postTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  postDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  postDate: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
    marginTop: 2,
  },
});