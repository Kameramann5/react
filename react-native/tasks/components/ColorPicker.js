import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Slider from '@react-native-community/slider';

const ColorPicker = ({
  red,
  setRed,
  green,
  setGreen,
  blue,
  setBlue,
  colorValue,
  onColorChange,
  setColorToRed, 
  setColorToBlue,
  setColorToGreen,
  setColorToPink,
  setColorToLightBlue,
  setColorToYellow,
  setColorToOrange,
  setColorToBlack
}) => {
  const backgroundColor = `rgb(${red}, ${green}, ${blue})`;

  return (
    <View style={{ flex: 1, padding: 20, }}>
   
      {/* Отображение выбранного цвета */}
      <TextInput
        maxLength={300}
        style={{
          height: 50,
          borderWidth: 1,
          borderColor: 'silver',
          borderRadius: 8,
          padding: 15,
          backgroundColor: backgroundColor,
          textAlignVertical: 'top',
          fontSize: 16,
          color: 'transparent',
        }}
        value={colorValue}
        placeholder={backgroundColor}
        onChangeText={onColorChange}
        multiline
      />
 <View style={{ flex: 1, gap: 10, flexDirection: 'row', marginTop:10 }}>  
      {/* Кнопка для установки красного цвета */}
      <TouchableOpacity
        style={{
      backgroundColor:'black',
      borderRadius:100,
      width:20,height:20
        }}
        onPress={() => {
          if (setColorToBlack) {
            setColorToBlack();
          }
        }}
      >
      </TouchableOpacity>
      <TouchableOpacity
        style={{
      backgroundColor:'red',
      borderRadius:100,
      width:20,height:20
        }}
        onPress={() => {
          if (setColorToRed) {
            setColorToRed();
          }
        }}
      >
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor:'rgb(0, 255, 0)',
      borderRadius:100,
      width:20,height:20
        }}
        onPress={() => {
          if (setColorToGreen) {
            setColorToGreen();
          }
        }}
      >
      </TouchableOpacity>
      <TouchableOpacity
       style={{
      backgroundColor:'blue',
      borderRadius:100,
      width:20,height:20
        }}
        onPress={() => {
          if (setColorToBlue) {
            setColorToBlue();
          }
        }}
      >
 
      </TouchableOpacity>
      <TouchableOpacity
       style={{
      backgroundColor:'pink',
      borderRadius:100,
      width:20,height:20
        }}
        onPress={() => {
          if (setColorToPink) {
            setColorToPink();
          }
        }}
      >
 
      </TouchableOpacity>
      <TouchableOpacity
       style={{
      backgroundColor:'rgb(135, 206, 235)',
      borderRadius:100,
      width:20,height:20
        }}
        onPress={() => {
          if (setColorToLightBlue) {
            setColorToLightBlue();
          }
        }}
      >
 
      </TouchableOpacity>
      <TouchableOpacity
       style={{
      backgroundColor:'rgb(255, 255, 0)',
      borderRadius:100,
      width:20,height:20
        }}
        onPress={() => {
          if (setColorToYellow) {
            setColorToYellow();
          }
        }}
      >
 
      </TouchableOpacity>
      <TouchableOpacity
       style={{
      backgroundColor:'rgb(255, 165, 0)',
      borderRadius:100,
      width:20,height:20
        }}
        onPress={() => {
          if (setColorToOrange) {
            setColorToOrange();
          }
        }}
      >
 
      </TouchableOpacity>
      </View>

      {/* Слайдер для красного */}
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={255}
        step={1}
        value={red}
        onValueChange={setRed}
        minimumTrackTintColor="red"
        maximumTrackTintColor="red"
        thumbTintColor="red"
      />

      {/* Слайдер для зеленого */}
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={255}
        step={1}
        value={green}
        onValueChange={setGreen}
        minimumTrackTintColor="rgb(0, 255, 0)"
        maximumTrackTintColor="rgb(0, 255, 0)"
        thumbTintColor="rgb(0, 255, 0)"
      />

      {/* Слайдер для синего */}
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={255}
        step={1}
        value={blue}
        onValueChange={setBlue}
        minimumTrackTintColor="blue"
        maximumTrackTintColor="blue"
        thumbTintColor="blue"
      />
    </View>
  );
};

export default ColorPicker;