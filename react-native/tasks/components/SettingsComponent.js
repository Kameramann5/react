import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { SwitchContext } from './Settings/SwitchContext';
import { Picker } from '@react-native-picker/picker';


function Settings() {
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
    </ScrollView>
  );
}

// ваши стили
const styles = StyleSheet.create({
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