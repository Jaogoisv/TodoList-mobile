import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Atividades from "./src/app/atividades";
import Home from "./src/app/home";
import Atividade from "./src/app/atividade template";
import Cadastro from "./src/app/cadastro";
import Login from "./src/app/login";
import Recuperarsenha from "./src/app/recuperar senha";
import Recuperarsenhaetapa2 from "./src/app/recuperar senha/etapa2";
import Recuperarsenhaetapa3 from "./src/app/recuperar senha/etapa3";
import Mudarnome from "./src/app/mudar nome";
import Perfil from "./src/app/perfil";
import Criaratividade from "./src/app/criar atividade";
import Criarpasta from "./src/app/criar pasta";
import EditarPasta from './src/app/editar pasta';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false 
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="RecuperarSenha" component={Recuperarsenha} />
        <Stack.Screen name="RecuperarSenhaEtapa2" component={Recuperarsenhaetapa2} />
        <Stack.Screen name="RecuperarSenhaEtapa3" component={Recuperarsenhaetapa3} />

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Atividades" component={Atividades} />
        <Stack.Screen name="CriarPasta" component={Criarpasta} />
        <Stack.Screen name="Atividade" component={Atividade} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="MudarNome" component={Mudarnome} />
        <Stack.Screen name="CriarAtividade" component={Criaratividade} />
        <Stack.Screen name="EditarPasta" component={EditarPasta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}