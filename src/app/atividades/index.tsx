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
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useCustomFonts } from "../../../styles";
import Constants from "expo-constants";
import React, { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { AxiosError } from "axios";

interface Activity {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface RouteParams {
  folderId: string;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
  activityContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 3,
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 9,
  },
  activityText: {
    marginTop: 5,
    fontSize: 30,
    fontFamily: "fontpixel",
  },
  descriptionText: {
    marginTop: 5,
    fontSize: 30,
    fontFamily: "fontpixel",
    color: "rgba(0,0,0,0.6)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: "fontpixel",
    fontSize: 30,
    color: "white",
    marginTop: 20,
  },
});

export default function Atividade({ navigation }: any) {
  const fontsLoaded = useCustomFonts();
  const route = useRoute();
  const { folderId } = route.params as RouteParams;

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  if (!fontsLoaded) return null;

  const fetchActivities = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("Login");
        return;
      }

      const response = await api.get(`/task`, {
        params: { folderId: folderId },
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.error(
        "Erro ao buscar atividades:",
        err.response?.data || err.message
      );
      Alert.alert("Erro", "Não foi possível carregar as atividades");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchActivities();
    }, [folderId])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchActivities();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Carregando atividades...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1, alignContent: "center" }}>
        <ImageBackground
          source={require("../../../assets/background/fundo2.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderWidth: 3,
              padding: 9,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/icons/arrow-left.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CriarAtividade", {
                folder_id: folderId,
                onTaskCreated: fetchActivities, // Passa a função de atualização
              })
            }
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderWidth: 3,
              padding: 9,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/icons/note-plus.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#FFFFFF"]}
              tintColor="#FFFFFF"
            />
          }
        >
          {activities.map((activity) => (
            <View key={activity.id}>
              <TouchableOpacity
                style={[styles.activityContainer]}
                onPress={() =>
                  navigation.navigate("Atividade", { activityId: activity.id })
                }
              >
                <Image
                  source={require("../../../assets/icons/file-alt.png")}
                  style={{ width: 30, height: 30, marginRight: 5 }}
                />
                <View>
                  <Text style={styles.activityText}>
                    {activity.title}
                    {"\n"}
                    {formatDate(activity.createdAt)}
                    {"\n"}
                    {formatDate(activity.updatedAt)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.activityText}>
                    {"\n"} {"  "} {"\n"} {"  "}
                  </Text>
                </View>
                <View>
                  <Text style={styles.activityText}>
                    {"\n"} (Criado) {"\n"} (Atualizado)
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
