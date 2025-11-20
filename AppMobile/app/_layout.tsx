import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="escolha-cadastro" />
      <Stack.Screen name="cadastro-medico" />
      <Stack.Screen name="cadastro-paciente" />
      <Stack.Screen name="cadastro-secretario" />

      <Stack.Screen name="consultas" />
      <Stack.Screen name="prescricoes" />
      <Stack.Screen name="prescricao-medica" />
      <Stack.Screen name="bate-papo" />
      <Stack.Screen name="mapa" />
      <Stack.Screen name="perfil-medico" />
      <Stack.Screen name="perfil-paciente" />
      <Stack.Screen name="perfil-secretario" />
      <Stack.Screen name="configuracoes" />
      <Stack.Screen name="suporte" />
    </Stack>
  );
}
