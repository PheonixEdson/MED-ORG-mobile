import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="escolha-cadastro" />
      <Stack.Screen name="cadastro-medico" />
      <Stack.Screen name="cadastro-paciente" />
      <Stack.Screen name="cadastro-secretario" />
    </Stack>
  );
}
