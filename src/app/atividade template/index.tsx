import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useCustomFonts } from "../../../styles";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api from "../../services/api";

type RootStackParamList = {
  EditarAtividade: { activityId: string };
};

interface Activity {
  id: string;
  folder_id: string;
  title: string;
  description: string;
  done: boolean;
}

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
  contentContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 3,
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 9,
  },
  contentText: {
    marginTop: 5,
    fontSize: 30,
    fontFamily: "fontpixel",
  },
  descriptionContainer: {
    backgroundColor: "white",
    borderWidth: 3,
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 9,
  },
  descriptionText: {
    marginTop: 5,
    fontSize: 30,
    fontFamily: "fontpixel",
    color: "rgba(0,0,0,0.6)",
  },
  footer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    margin: 15,
    marginBottom: 90,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 3,
    padding: 9,
    alignItems: "center",
  },
});

export default function Atividade() {
  const fontsLoaded = useCustomFonts();
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { activityId } = route.params as { activityId: string };

  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await api.get(`/task/${activityId}`);
        setActivity(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefa:", error);
        Alert.alert("Erro", "Não foi possível carregar a tarefa");
      } finally {
        setLoading(false);
      }
    }

    fetchActivity();
  }, [activityId]);

  const handleToggleComplete = async () => {
    try {
      const updatedTask = {
        ...activity,
        done: !activity?.done,
      };

      const response = await api.put(`/task/${activityId}`, updatedTask);
      setActivity(response.data);
      Alert.alert(
        "Sucesso",
        `Tarefa marcada como ${response.data.done ? "concluida" : "pendente"}`
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      Alert.alert("Erro", "Não foi possível atualizar o status");
    }
  };

  const handleEdit = () => {
    navigation.navigate('EditarAtividade', { activityId });
  };

  if (!fontsLoaded || loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/background/fundo2.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.folderContainer}>
            <Image
              resizeMode="cover"
              source={require("../../../assets/icons/folder.png")}
              style={{ width: 30, height: 30, opacity: 0.5 }}
            />
            <Text style={styles.folderText}>
              Pasta {activity?.folder_id ?? "?"}
            </Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Image
              resizeMode="cover"
              source={require("../../../assets/icons/more-horizontal.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>

        {/* Conteúdo */}
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              Titulo{"\n"}Status
            </Text>
            <Text style={styles.contentText}>
              : {"\n"}:
            </Text>
            <Text style={styles.contentText}>
              {activity?.title || "N/A"}
              {"\n"}
              {activity?.done ? "Concluida" : "Pendente"}
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              {activity?.description || "Sem descricao"}
            </Text>
          </View>
        </ScrollView>

        {/* Rodapé com botões */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Image
              resizeMode="cover"
              source={require("../../../assets/icons/arrow-left.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
          
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.button, { marginRight: 7 }]}
              onPress={handleEdit}
            >
              <Image
                resizeMode="cover"
                source={require("../../../assets/icons/edit.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, { marginLeft: 7 }]}
              onPress={handleToggleComplete}
            >
              <Image
                resizeMode="cover"
                source={require("../../../assets/icons/check.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}