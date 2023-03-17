import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';


const ModalPickerListCarTypeComponent = ({setData, categories, changeModaVisibility,}) => {

  const onPressItem = (option) => {
    setData(option);
  };


  const option = categories.map((item, index) => {
    return (
        <TouchableOpacity key={index} onPress={() => onPressItem(item)}>
        <View style={{ justifyContent: "center", alignItems: "center", marginTop:5 }}>
          <Text
            style={{
              color: '#A6A2A2',
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 10,
            }}
          >
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });

 
 
  return (
    <TouchableOpacity onPress={() => changeModaVisibility(false)}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
};

export { ModalPickerListCarTypeComponent };