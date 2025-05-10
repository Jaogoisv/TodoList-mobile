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
import React from "react";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default function Atividade() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) return null; 

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
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderWidth: 3,
              marginHorizontal: 15,
              marginVertical: 6,
              padding: 9,
            }}
          >
            <Text
              style={{ marginTop: 5, fontSize: 30, fontFamily: "fontpixel" }}
            >
              Titulo{"\n"}Criacao {"\n"}Edicao
            </Text>
            <Text
              style={{ marginTop: 5, fontSize: 30, fontFamily: "fontpixel" }}
            >
              : {"\n"}: {"\n"}:
            </Text>
            <Text
              style={{ marginTop: 5, fontSize: 30, fontFamily: "fontpixel" }}
            >
              Atividade 1{"\n"}00/00/0000{"\n"}00/00/0000
            </Text>
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
            <Text
              style={{
                marginTop: 5,
                fontSize: 30,
                fontFamily: "fontpixel",
                color: "rgba(0,0,0,0.6)",
              }}
            >
              Lorem ipsum dolor sit amet. Et repudiandae architecto nam
              blanditiis commodi et porro optio. Ut delectus sunt et nisi
              tempora ea quia autem eum facilis provident vel dolorem aspernatur
              in alias quos. Lorem ipsum dolor sit amet. Et repudiandae
              architecto nam blanditiis commodi et porro optio. Ut delectus sunt
              et nisi tempora ea quia autem eum facilis provident vel dolorem
              aspernatur in alias quos. Lorem ipsum dolor sit amet. Et
              repudiandae architecto nam blanditiis commodi et porro optio. Ut
              delectus sunt et nisi tempora ea quia autem eum facilis provident
              vel dolorem aspernatur in alias quos. Lorem ipsum dolor sit amet.
              Et repudiandae architecto nam blanditiis commodi et porro optio.
              Ut delectus sunt et nisi tempora ea quia autem eum facilis
              provident vel dolorem aspernatur in alias quos.
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
              margin: 15,
              marginBottom: 90,
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
                source={require("../../../assets/icons/arrow-left.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderWidth: 3,
                  padding: 9,
                  alignItems: "center",
                  marginRight: 7,
                }}
              >
                <Image
                  resizeMode="cover"
                  source={require("../../../assets/icons/edit.png")}
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
                  marginLeft: 7,
                }}
              >
                <Image
                  resizeMode="cover"
                  source={require("../../../assets/icons/check.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
