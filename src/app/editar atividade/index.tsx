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
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default function EditarAtividade() {
  const fontsLoaded = useCustomFonts();
  const route = useRoute();
  const navigation = useNavigation();
  const { activityId }: any = route.params;
  const [task, setTask] = useState<any>(null);


  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
  
      try {
        const response = await api.get(`/task/${activityId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(response.data);
        setTitulo(response.data.title);
        setDescricao(response.data.description);
      } catch (error) {
        console.error("Erro ao buscar atividade:", error);
      }
    };
  
    fetchTask();
  }, []);
  
  if (!task) return null;
  if (!fontsLoaded) return null;

  const handleUpdateAtividade = async () => {
    if (!titulo.trim()) {
      Alert.alert("Erro", "Digite um titulo para a atividade");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      await api.put(
        `/task/${activityId}`,
        {
          title: titulo,           
          description: descricao,  
          done: task.done,
          folder_id: task.folder_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      Alert.alert("Sucesso", "Atividade atualizada com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao atualizar atividade:", error);
      Alert.alert("Erro", "Não foi possível atualizar a atividade");
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
            Titulo da atividade:
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
            value={titulo}
            onChangeText={setTitulo}
          />
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
            Descricao:
          </Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={{
              fontSize: 20,
              fontFamily: "fontpixel",
              borderWidth: 3,
              marginTop: 7,
              marginBottom: 5,
              backgroundColor: "#D9D9D9",
              padding: 8,
              height: 120,
              textAlignVertical: "top",
            }}
            placeholder="Digite a descricao..."
            value={descricao}
            onChangeText={setDescricao}
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
            onPress={handleUpdateAtividade}
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
