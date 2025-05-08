import { View } from "react-native";
import Atividades from "./src/app/atividades";
import Home from "./src/app/home";
import Atividade from "./src/app/atividade template";
import Cadastro from "./src/app/cadastro";
import Login from "./src/app/login";
import Recuperarsenha from "./src/app/recuperar senha";
import Recuperarsenhaetapa2 from "./src/app/recuperar senha/etapa2";
import Recuperarsenhaetapa3 from "./src/app/recuperar senha/etapa3";
import Criarativiade from "./src/app/criar atividade";
import Criarpasta from "./src/app/criar pasta";
import Mudarnome from "./src/app/mudar nome";
import Perfil from "./src/app/perfil";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Home />
    </View>
  );
}
