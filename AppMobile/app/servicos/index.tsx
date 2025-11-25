import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Servicos() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.voltarBtn} onPress={() => router.back()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.icone}></Text>

        <Text style={styles.titulo}>Serviços</Text>

        <Text style={styles.subtitulo}>
          Esta seção está sendo preparada para oferecer novos recursos.
        </Text>

        <Text style={styles.status}>Tela em construção...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 20,
  },

  voltarBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#1e3a8a",
    borderRadius: 8,
  },

  voltarTexto: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    width: 320,
    backgroundColor: "#fff",
    paddingVertical: 40,
    paddingHorizontal: 25,
    borderRadius: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: "center",
  },

  icone: {
    fontSize: 48,
    marginBottom: 15,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    marginBottom: 20,
  },

  status: {
    fontSize: 16,
    color: "#1e3a8a",
    fontWeight: "600",
  },
});
