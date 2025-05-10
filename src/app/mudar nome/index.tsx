import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useCustomFonts } from "../../..//styles";
import Constants from "expo-constants";
import React from "react";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default function Mudarnome() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) return null; 

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1, alignContent: "center" }}>
        <ImageBackground
          source={require("../../../assets/background/fundo2.png")}
          style={{
            position: "absolute",
            top: Constants.statusBarHeight,
            width: "100%",
            height: "100%",
            left: 0,
            zIndex: -1,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 3,
            marginHorizontal: 15,
            marginVertical: 6,
            padding: 9,
            marginTop: 200,
          }}
        >
          <Text style={{ marginTop: 5, fontSize: 30, fontFamily: "fontpixel" }}>
            Digite seu novo nome:
          </Text>
          <TextInput
            style={{
              fontSize: 25,
              fontFamily: "fontpixel",
              borderWidth: 3,
              marginTop: 5,
              marginBottom: 5,
              backgroundColor: "#D9D9D9",
            }}
            placeholder="Digite aqui..."
          ></TextInput>
          <TouchableOpacity
            style={{
              borderWidth: 3,
              padding: 3,
              alignContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontFamily: "fontpixel", fontSize: 30, marginTop: 5 }}
            >
              Confirmar
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            margin: 15,
            marginBottom: 90,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderWidth: 3,
              padding: 9,
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="cover"
              source={require("../../../assets/icons/arrow-left.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
