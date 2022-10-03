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
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      <View style={[{ maxheight: 500, width: "100%" }]}>
        <Text style={styles.text}>Height</Text>

        <View style={[styles.inpV, { flexDirection: "row" }]}>
          <TextInput
            style={[styles.inpo, { flex: 1 }]}
            placeholder={heightUnit}
            keyboardType="numeric"
            onChangeText={(text) => {
              setheight(parseFloat(text));
            }}>
          </TextInput>
          <Picker style={[styles.selector, { width: 50 }]} selectedValue={heightUnit}
            onValueChange={(itemValue, itemIndex) => setheightUnit(itemValue)}>
            <Picker.Item label="cm" value="cm" />
            <Picker.Item label="Feet.Inch" value="Feet.Inch" />
          </Picker>
        </View>
        <Text style={styles.text}>Weight</Text>
        <View style={[styles.inpV, { flexDirection: "row" }]}>
          <TextInput
            keyboardType="numeric"
            style={[styles.inpo, { flex: 1 }]}
            placeholder={weightUnit}
            onChangeText={(text) => {
              setweight(parseFloat(text));
            }}
          ></TextInput>
          <Picker style={[styles.selector, { width: 50 }]} selectedValue={weightUnit}
            onValueChange={(itemValue, itemIndx) => setweightUnit(itemValue)}>
            <Picker.Item label="Kg" value="Kg" />
            <Picker.Item label="Lbs" value="Lbs" />
          </Picker>
        </View>

      </View>
      <View style={[{ width: "100%", flexDirection: "row", alignContent: "center", justifyContent: "center" }]}>
        <TouchableOpacity
          style={[styles.submi, styles.shadow]}
          onPress={() => {
            setbmi("BMI = " + measurementChange(weight, weightUnit, height, heightUnit));
          }}
          title="Submit"
        ><Text style={styles.text}>Submit</Text></TouchableOpacity></View>
      <Text style={styles.text2}>{bmi}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarheight,
    backgroundColor: '#22A7F0',
    padding: 8,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 10,
  },
  submi: {
    borderRadius: 50,
    backgroundColor: "#000000",
    padding: 2,
    borderWidth: 2,
    width: 100,
    alignItems: "center",
    alignItems: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  inpV: {
    borderBottomWidth: 2,
    borderColor: "#999",
    marginHorizontal: 15,
    marginBottom: 25,
    paddingHorizontal: 8
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    top: 0,
    marginVertical: 20,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 35,
  },
  text2: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    lineHeight: 35,
  },
});
