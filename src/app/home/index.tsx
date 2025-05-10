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
  Alert,
  RefreshControl,
} from "react-native";
import { useCustomFonts } from "../../../styles";
import Constants from "expo-constants";
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  folderContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 3,
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 9,
    alignItems: "center",
  },
  folderText: {
    fontFamily: "fontpixel",
    fontSize: 30,
    marginLeft: 10,
    marginTop: 7,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    marginTop: 90,
    marginBottom: 20,
    alignContent: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  backgroundImage: {
    position: "absolute",
    top: Constants.statusBarHeight,
    width: "100%",
    height: "100%",
    left: 0,
    zIndex: -1,
  },
  loadingText: {
    fontFamily: "fontpixel", 
    fontSize: 30, 
    textAlign: "center", 
    color: "white"
  }
});

interface Folder {
  id: string;
  name: string;
}

type ApiError = {
  message?: string;
  response?: {
    data?: {
      message?: string;
    };
  };
};

export default function Home({ navigation }: any) {
  const fontsLoaded = useCustomFonts();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  if (!fontsLoaded) return null;

  const fetchFolders = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
        return;
      }

      const response = await api.get('/folder', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFolders(response.data);
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      console.error('Erro ao buscar pastas:', err.response?.data || err.message);
      Alert.alert('Erro', 'Não foi possível carregar as pastas');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFolders();

    const unsubscribe = navigation.addListener('focus', fetchFolders);
    return unsubscribe;
  }, [navigation]);

  const handleCreateFolder = () => {
    navigation.navigate('CriarPasta', {
      onGoBack: (newFolder: Folder) => {
        setFolders(prev => [...prev, newFolder]);
      }
    }); 
  };

  const handleEditFolder = async (folderId: string, newName: string) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
        return false;
      }

      await api.put(
        `/folder/${folderId}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setFolders(prevFolders => 
        prevFolders.map(folder => 
          folder.id === folderId ? { ...folder, name: newName } : folder
        )
      );
      return true;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      console.error('Erro ao editar pasta:', err.response?.data || err.message);
      Alert.alert('Erro', err.response?.data?.message || 'Não foi possível editar a pasta');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('Login');
        return;
      }

      await api.delete(`/folder/${folderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFolders(prev => prev.filter(folder => folder.id !== folderId));
      Alert.alert('Sucesso', 'Pasta excluída com sucesso!');
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      console.error('Erro ao excluir pasta:', err.response?.data || err.message);
      Alert.alert('Erro', err.response?.data?.message || 'Não foi possível excluir a pasta');
    } finally {
      setLoading(false);
    }
  };

  const promptEditFolder = (folder: Folder) => {
    Alert.prompt(
      'Editar Pasta',
      'Digite o novo nome da pasta:',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salvar',
          onPress: async (newName: string | undefined) => {
            if (newName && newName.trim()) {
              const success = await handleEditFolder(folder.id, newName.trim());
              if (success) {
                Alert.alert('Sucesso', 'Pasta atualizada com sucesso!');
              }
            } else {
              Alert.alert('Erro', 'O nome da pasta não pode estar vazio');
            }
          },
        },
      ],
      'plain-text',
      folder.name
    );
  };

  const promptDeleteFolder = (folderId: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta pasta? Todas as atividades dentro dela serão perdidas.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => handleDeleteFolder(folderId),
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFolders();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1, alignContent: "center" }}>
        <ImageBackground
          source={require("../../../assets/background/fundo2.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        
        <View style={styles.header}>
          <View style={{ opacity: 0 }}>
            <Image
              source={require("../../../assets/icons/folder.png")}
              style={{ width: 30, height: 30 }}
            />
          </View>
          
          <TouchableOpacity
            onPress={handleCreateFolder}
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderWidth: 3,
              padding: 9,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/icons/folder-plus.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        
        {loading && !refreshing ? (
          <Text style={styles.loadingText}>
            Carregando...
          </Text>
        ) : (
          <ScrollView 
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#FFFFFF"]}
                tintColor="#FFFFFF"
              />
            }
          >
            {folders.map((folder) => (
              <TouchableOpacity
                key={folder.id}
                style={styles.folderContainer}
                onPress={() => navigation.navigate('CriarAtividade', { folderId: folder.id })}
              >
                <Image
                  source={require("../../../assets/icons/folder.png")}
                  style={{ width: 30, height: 30 }}
                />
                
                <Text style={styles.folderText}>
                  {folder.name}
                </Text>
                
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{ marginHorizontal: 5 }}
                    onPress={(e) => {
                      e.stopPropagation();
                      promptEditFolder(folder);
                    }}
                  >
                    <Image
                      source={require("../../../assets/icons/edit.png")}
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={{ marginHorizontal: 5 }}
                    onPress={(e) => {
                      e.stopPropagation();
                      promptDeleteFolder(folder.id);
                    }}
                  >
                    <Image
                      source={require("../../../assets/icons/close.png")}
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}