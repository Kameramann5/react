import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import { SwitchContext } from './Settings/SwitchContext';
import { Picker } from '@react-native-picker/picker';
import Icon from '@react-native-vector-icons/ionicons';
import { TasksContext } from '../Context/TasksContext';




function Settings() {
  const { deleteAllTasks } = useContext(TasksContext);
  const { Minimalizm, toggleSwitch } = useContext(SwitchContext);
  return (
    <ScrollView style={styles.container}>
      {/* Переключатель для плеера */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Другой вид списка</Text>
        <Switch
          value={Minimalizm}
          onValueChange={toggleSwitch}
          trackColor={{ false: '#e3e3e3', true: '#83bfff' }}
          thumbColor={Minimalizm ? '#007BFF' : '#e3e3e3'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={deleteAllTasks}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteButtonText}>Удалить все</Text>
        <Icon
          name="close-circle"
          size={20}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

// ваши стили
const styles = StyleSheet.create({
  deleteButtonText: {
    color:'white',
  },
  deleteButton: {
    flexDirection: 'row', borderRadius:100,
    alignItems: 'center',
    backgroundColor: '#ff5c5c',
    gap: 5,
    justifyContent: 'center',
    paddingHorizontal:15,
    paddingVertical:10,
    
    width:150
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    overflow: 'hidden',
    paddingLeft: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'white',
  },
});

export default Settings;