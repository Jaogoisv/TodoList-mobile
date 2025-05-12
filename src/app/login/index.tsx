import { StatusBar } from "expo-status-bar";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useCustomFonts } from "../../..//styles";
import Constants from "expo-constants";
import React, { useState } from "react";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default function Login({ navigation }: any) {
  const fontsLoaded = useCustomFonts();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!fontsLoaded) return null;

  const handleLogin = async () => {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      await AsyncStorage.setItem("token", response.data.token.token);

      Alert.alert("Login bem-sucedido!");
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert("Erro ao fazer login");
    }
  };

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
            LOGIN
          </Text>
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
              padding: 8,
            }}
            placeholder="Digite aqui..."
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
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
              padding: 8,
            }}
            placeholder="Digite aqui..."
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              marginVertical: 14,
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "fontpixel",
                  color: "#0051FF",
                }}
                onPress={() => navigation.navigate("Cadastro")}
              >
                Criar conta
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              borderWidth: 3,
              backgroundColor: "#6355FF",
              marginHorizontal: "30%",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 10,
              paddingVertical: 8,
            }}
          >
            <Text
              style={{ fontFamily: "fontpixel", fontSize: 30, color: "white" }}
            >
              Entrar
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
