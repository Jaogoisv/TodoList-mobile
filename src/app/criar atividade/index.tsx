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
  Image,
} from "react-native";
import { useCustomFonts } from "../../..//styles";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default function Criarativiade() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) return null; // Espera a fonte carregar antes de renderizar

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
            flexDirection: "row",
            marginTop: 90,
            marginBottom: 20,
            alignContent: "center",
            justifyContent: "space-between",
            marginHorizontal: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderWidth: 3,
              padding: 9,
              alignItems: "center",
              borderColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Image
              resizeMode="cover"
              source={require("../../../assets/icons/folder.png")}
              style={{ width: 30, height: 30, opacity: 0.5 }}
            />
            <Text
              style={{
                fontFamily: "fontpixel",
                fontSize: 30,
                marginLeft: 10,
                marginTop: 7,
                opacity: 0.5,
              }}
            >
              Pasta 1
            </Text>
          </View>
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
            Titulo:
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
            style={{
              fontSize: 25,
              fontFamily: "fontpixel",
              borderWidth: 3,
              marginTop: 5,
              marginBottom: 5,
              backgroundColor: "#D9D9D9",
              padding: 10,
              height: 263,
              textAlignVertical: "top",
            }}
            placeholder="Digite aqui..."
            multiline={true}
            numberOfLines={15}
            scrollEnabled={true}
          ></TextInput>
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
