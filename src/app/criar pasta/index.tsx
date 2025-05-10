import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { useCustomFonts } from "../../../styles";
import Constants from "expo-constants";
import React, { useState } from "react";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default function CriarPasta() {
  const fontsLoaded = useCustomFonts();
  const [folderName, setFolderName] = useState("");

  const navigation = useNavigation();

  if (!fontsLoaded) return null;

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      Alert.alert("Erro", "Digite um nome para a pasta");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return;
      }

      const response = await api.post(
        "/folder",
        { name: folderName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Sucesso", "Pasta criada com sucesso!");
      navigation.goBack(); 
    } catch (error) {
      console.error("Erro ao criar pasta:", error);
      Alert.alert("Erro", "Não foi possível criar a pasta");
    }
  };

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
            flexDirection: "row-reverse",
            marginTop: 90,
            marginBottom: 20,
            alignContent: "center",
            justifyContent: "space-between",
            marginHorizontal: 15,
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
              source={require("../../../assets/icons/more-horizontal.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 3,
            marginHorizontal: 15,
            marginVertical: 6,
            padding: 9,
          }}
        >
          <Text style={{ marginTop: 5, fontSize: 30, fontFamily: "fontpixel" }}>
            Título pasta:
          </Text>
          <TextInput
            style={{
              fontSize: 25,
              fontFamily: "fontpixel",
              borderWidth: 3,
              marginTop: 7,
              marginBottom: 5,
              backgroundColor: "#D9D9D9",
              padding: 8, 
            }}
            placeholder="Digite aqui..."
            value={folderName}
            onChangeText={setFolderName}
          />
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            alignContent: "center",
            justifyContent: "space-between",
            margin: 15,
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
            onPress={handleCreateFolder}
          >
            <Image
              resizeMode="cover"
              source={require("../../../assets/icons/check.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderWidth: 3,
              padding: 9,
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}
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