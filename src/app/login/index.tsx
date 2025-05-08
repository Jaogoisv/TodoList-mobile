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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default function Login() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) return null; // Espera a fonte carregar antes de renderizar

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
            zIndex: -1, // Mantém a imagem no fundo
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
            }}
            placeholder="Digite aqui..."
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
            secureTextEntry={true}
          ></TextInput>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              marginVertical: 14,
            }}
          >
            <TouchableOpacity style={{ marginRight: 40 }}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "fontpixel",
                  color: "#0051FF",
                }}
              >
                Criar conta
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 40 }}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "fontpixel",
                  color: "#0051FF",
                }}
              >
                Esqueci a senha
              </Text>
            </TouchableOpacity>
          </View>
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
          >
            <Text style={{ fontFamily: "fontpixel", fontSize: 30 }}>
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
