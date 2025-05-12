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
  ActivityIndicator,
} from "react-native";
import { useCustomFonts } from "../../../styles";
import Constants from "expo-constants";
import React, { useState } from "react";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  CriarAtividade: { folder_id: number };
};

type CriarAtividadeRouteProp = RouteProp<RootStackParamList, "CriarAtividade">;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: Constants.statusBarHeight,
    width: "100%",
    height: "100%",
    left: 0,
    zIndex: -1,
  },
  header: {
    flexDirection: "row",
    marginTop: 90,
    marginBottom: 20,
    alignContent: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  folderContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 3,
    padding: 9,
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
  folderText: {
    fontFamily: "fontpixel",
    fontSize: 30,
    marginLeft: 10,
    marginTop: 7,
    opacity: 0.5,
  },
  inputContainer: {
    backgroundColor: "white",
    borderWidth: 3,
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 9,
  },
  inputTitle: {
    marginTop: 5,
    fontSize: 30,
    fontFamily: "fontpixel",
  },
  textInput: {
    fontSize: 25,
    fontFamily: "fontpixel",
    borderWidth: 3,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#D9D9D9",
  },
  descriptionInput: {
    height: 263,
    textAlignVertical: "top",
    padding: 10,
  },
  footer: {
    flexDirection: "row-reverse",
    alignContent: "center",
    justifyContent: "space-between",
    margin: 15,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 3,
    padding: 9,
    alignItems: "center",
  },
});

export default function CriarAtividade() {
  const fontsLoaded = useCustomFonts();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute<CriarAtividadeRouteProp>();
  const { folder_id } = route.params || {};

  if (!fontsLoaded) return null;

  if (typeof folder_id !== "number") {
    Alert.alert("Erro", "Pasta não identificada corretamente");
    navigation.goBack();
    return null;
  }

  const handleCreateTask = async () => {
    if (!titulo.trim()) {
      Alert.alert("Erro", "Digite um título para a tarefa");
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Erro", "Autenticação necessária");
        return;
      }

      const payload = {
        title: titulo,
        description: descricao,
        folder_id,
      };

      console.log("Enviando para API:", payload);

      const response = await api.post("/task", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert("Sucesso", "Tarefa criada com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
      navigation.goBack();
    } catch (error: any) {
      console.error("Erro ao criar tarefa:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });

      const errorMessage = error.response?.data?.message || "Erro desconhecido";
      Alert.alert("Erro", `Falha ao criar tarefa: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/background/fundo2.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        <View style={styles.header}>
          <View style={styles.folderContainer}>
            <Image
              resizeMode="cover"
              source={require("../../../assets/icons/folder.png")}
              style={{ width: 30, height: 30, opacity: 0.5 }}
            />
            <Text style={styles.folderText}>Pasta {folder_id}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Titulo:</Text>
          <TextInput
            style={[styles.textInput, { height: 44, paddingTop: 8 }]}
            placeholder="Digite aqui..."
            value={titulo}
            onChangeText={setTitulo}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Descricao:</Text>
          <TextInput
            style={[styles.textInput, styles.descriptionInput]}
            placeholder="Digite aqui..."
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={15}
            scrollEnabled
            editable={!loading}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateTask}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Image
                resizeMode="cover"
                source={require("../../../assets/icons/check.png")}
                style={{ width: 30, height: 30 }}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
            disabled={loading}
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
