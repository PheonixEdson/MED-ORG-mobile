import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TelaPlaceholder() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.voltarBtn} onPress={() => router.back()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <MaterialIcons name="construction" size={70} color="#3b82f6" />
        <Text style={styles.title}>Tela em Construção</Text>
        <Text style={styles.subtitle}>
          Estamos trabalhando para liberar esta função em breve.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2ff",
    padding: 20,
  },
  voltarBtn: {
    marginBottom: 25,
    alignSelf: "flex-start",
  },
  voltarTexto: {
    fontSize: 18,
    color: "#3b82f6",
    fontWeight: "700",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -60,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1e3a8a",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 30,
  },
});
