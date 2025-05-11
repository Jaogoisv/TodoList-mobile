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
  Alert
} from "react-native";
import { useCustomFonts } from "../../..//styles";
import Constants from "expo-constants";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default function Cadastro({ navigation }: any) {
  const fontsLoaded = useCustomFonts();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async() => {
    try {
      const response = await api.post('user', {
        name,
        email,
        password,
        confirmPassword,
      });


  
      Alert.alert('Conta criada com sucesso! Faça login para continuar.');
      navigation.navigate('Login');
    } catch (error: any) {
      console.error('Erro ao registrar conta:', error.response?.data || error.message);
  Alert.alert('Erro ao criar conta');
    }
  }

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
            paddingBottom: 10,
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
            CADASTRO
          </Text>
          <Text style={{ marginTop: 5, fontSize: 30, fontFamily: "fontpixel" }}>
            Nome:
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
            value={name}
            onChangeText={setName}
          ></TextInput>
          <Text style={{ marginTop: 5, fontSize: 30, fontFamily: "fontpixel" }}>
            Email:
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
            value={email}
            onChangeText={setEmail}
          ></TextInput>
          <Text style={{ marginTop: 5, fontSize: 30, fontFamily: "fontpixel" }}>
            Senha:
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
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          ></TextInput>
          <Text style={{ marginTop: 5, fontSize: 30, fontFamily: "fontpixel" }}>
            Confirmar senha:
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
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
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
            onPress={handleRegister}
          >
            <Text style={{ fontFamily: "fontpixel", fontSize: 30 }}>
              
              Cadastrar
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
