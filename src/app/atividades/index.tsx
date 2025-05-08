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
  ScrollView,
} from "react-native";
import { useCustomFonts } from "../../..//styles";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default function Atividades() {
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
              source={require("../../../assets/icons/note-plus.png")}
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
              source={require("../../../assets/icons/folder.png")}
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
              source={require("../../../assets/icons/more-horizontal.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderWidth: 3,
              marginHorizontal: 15,
              marginVertical: 6,
              padding: 9,
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="cover"
              source={require("../../../assets/icons/file-alt.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text
              style={{
                fontFamily: "fontpixel",
                fontSize: 30,
                marginLeft: 10,
                marginTop: 7,
              }}
            >
              Atividade 1
            </Text>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row",
                flex: 1,
              }}
            >
              <TouchableOpacity style={{ marginHorizontal: 5 }}>
                <Image
                  resizeMode="cover"
                  source={require("../../../assets/icons/check.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 5 }}>
                <Image
                  resizeMode="cover"
                  source={require("../../../assets/icons/close.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderWidth: 3,
              marginHorizontal: 15,
              marginVertical: 6,
              padding: 9,
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="cover"
              source={require("../../../assets/icons/file-alt.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text
              style={{
                fontFamily: "fontpixel",
                fontSize: 30,
                marginLeft: 10,
                marginTop: 7,
              }}
            >
              Atividade 2
            </Text>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row",
                flex: 1,
              }}
            >
              <TouchableOpacity style={{ marginHorizontal: 5 }}>
                <Image
                  resizeMode="cover"
                  source={require("../../../assets/icons/check.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 5 }}>
                <Image
                  resizeMode="cover"
                  source={require("../../../assets/icons/close.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderWidth: 3,
              marginHorizontal: 15,
              marginVertical: 6,
              padding: 9,
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="cover"
              source={require("../../../assets/icons/file-alt.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text
              style={{
                fontFamily: "fontpixel",
                fontSize: 30,
                marginLeft: 10,
                marginTop: 7,
              }}
            >
              Atividade 3
            </Text>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "row",
                flex: 1,
              }}
            >
              <TouchableOpacity style={{ marginHorizontal: 5 }}>
                <Image
                  resizeMode="cover"
                  source={require("../../../assets/icons/check.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 5 }}>
                <Image
                  resizeMode="cover"
                  source={require("../../../assets/icons/close.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
