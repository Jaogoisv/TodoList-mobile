import { useFonts } from "expo-font";

export function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    fontpixel: require("./assets/fonts/Pixeltype.ttf"),
  });

  return fontsLoaded;
}
