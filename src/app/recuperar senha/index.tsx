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
} from "react-native";
import { useCustomFonts } from "../../..//styles";
import Constants from "expo-constants";
import React from "react";
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default function Recuperarsenha() {
  const fontsLoaded = useCustomFonts();

  const navigation = useNavigation<any>(); 
  if (!fontsLoaded) return null; 

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1, alignContent: "center" }}>
        <ImageBackground
          source={require("../../../assets/background/fundo1.jpg")}
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

        <Text
          style={{
            color: "white",
            fontFamily: "fontpixel",
            textAlign: "center",
            fontSize: 79,
            paddingTop: 90,
            paddingBottom: 70,
            justifyContent: "flex-start",
          }}
        >
          TODO
        </Text>
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 3,
            margin: 15,
            padding: 15,
          }}
        >
          <Text
            style={{
              fontSize: 50,
              textAlign: "center",
              marginVertical: 20,
              fontFamily: "fontpixel",
            }}
          >
            RECUPERAR
          </Text>
          <Text style={{ marginTop: 5, fontSize: 30, fontFamily: "fontpixel" }}>
            Digite seu Email:
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
              backgroundColor: "#6355FF",
              marginHorizontal: "30%",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 10,
              paddingVertical: 5,
              paddingTop: 8,
            }}
            onPress={() => (navigation as any).navigate('RecuperarSenhaEtapa2')}
          >
            <Text style={{ fontFamily: "fontpixel", fontSize: 30 }}>
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "fontpixel",
            color: "white",
            textAlign: "center",
            paddingBottom: 10,
          }}
        >
          By Naelly & Jao
        </Text>
      </View>
    </SafeAreaView>
  );
}
