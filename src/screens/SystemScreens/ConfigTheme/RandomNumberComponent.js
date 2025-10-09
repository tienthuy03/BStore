// RandomNumberComponent.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Color } from "../../../colors/colortv";

const RandomNumberComponent = ({ onNumberChange }) => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [key, setKey] = useState(0);

  useEffect(() => {
    onNumberChange(randomNumber);
  }, [randomNumber]);

  function generateRandomNumber() {
    // Tạo số ngẫu nhiên từ 10 đến 99 (2 chữ số)
    return Math.floor(Math.random() * 90) + 10;
  }

  const regenerateNumber = () => {
    const newNumber = generateRandomNumber();
    setRandomNumber(newNumber);
    setKey((prevKey) => prevKey + 1);
    onNumberChange(newNumber);
  };

  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>{randomNumber}</Text>
      </View>
      <View style={styles.refreshContainer}>
        <TouchableOpacity onPress={regenerateNumber} style={styles.refreshButton}>
          <Icon size={20} color={"#143678"} name={"refresh"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  numberContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.white,
    borderWidth: 1,
    borderColor: Color.mainColor,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  numberText: {
    fontWeight: "bold",
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    color: "#333",
  },
  refreshContainer: {
    justifyContent: "center",
    marginLeft: 10,
  },
  refreshButton: {
    flexDirection: "row",
  },
});

export default RandomNumberComponent;
