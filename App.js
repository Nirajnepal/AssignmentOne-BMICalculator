import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import Constants from 'expo-constants';


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {

  const [height, setheight] = useState(0);
  const [weight, setweight] = useState(0);
  const [bmi, setbmi] = useState(" ");
  const [heightUnit, setheightUnit] = useState("cm");
  const [weightUnit, setweightUnit] = useState("Kg");


  function callBMI(lbs, inch) {
    let h2 = (inch) * (inch);
    let bmi = (lbs) / h2 * 703
    let f_bmi = Math.floor(bmi);
    let diff = bmi - f_bmi;
    diff = diff * 10;
    diff = Math.round(diff);
    if (diff == 10) {
      f_bmi += 1;
      diff = 0;
    }
    bmi = f_bmi + "." + diff;
    return bmi;
  }

  function measurementChange(weight, weightType, height, heightType) {
    var weightChange = weight;
    var heightChange = height;
    if (isNaN(weightChange) || weightChange <= 0) {
      alert("Enter Valid Value For Weight");
      return "Not Valid Input"
    }
    else if (isNaN(heightChange) || heightChange <= 0) {
      alert("Enter Valid Value For Height");
      return "Not Valid Input"
    }
    else {
      if (weightType == "Kg") {
        weightChange = weight * 2.20462;
      }
      if (heightType == "Feet.Inch") {
        heightChange = (parseInt(height) * 12) + ((height - parseInt(height)) * 10);
      }
      if (heightType == "cm") {
        heightChange = height / 2.54;
      }
      return callBMI(weightChange, heightChange);
    }
  }


  return (
    <Text>console.log(callBMI(45,5.4))</Text>
  );
}

