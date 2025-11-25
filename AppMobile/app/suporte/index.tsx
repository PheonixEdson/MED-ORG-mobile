import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Suporte() {
  const router = useRouter();

  const contatos = [
    { nome: "Arthur Felipe Leite de Vasconcelos", num: "(81) xxxxx-xxxx" },
    { nome: "Antônio Edson de Holada Neto", num: "(81) xxxxx-xxxx" },
    { nome: "Dacio da Silva Junior", num: "(81) xxxxx-xxxx" },
    { nome: "David Cândido De Souza", num: "(81) xxxxx-xxxx" },
    { nome: "Gabriel de Souza Leão Araujo", num: "(81) xxxxx-xxxx" },
    { nome: "Lucas Mourato Aureliano De Melo", num: "(81) xxxxx-xxxx" },
    { nome: "Matheus Fabiano Barbosa Aguilar", num: "(81) xxxxx-xxxx" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.voltarBtn} onPress={() => router.back()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.titulo}>Contatos de Suporte</Text>

        {contatos.map((c, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.nome}>{c.nome}</Text>
            <Text style={styles.num}>{c.num}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: "#f3f4f6",
    minHeight: "100%",
  },

  voltarBtn: {
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 15,
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
    backgroundColor: "#fff",
    width: 320,
    padding: 25,
    borderRadius: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  titulo: {
    fontSize: 20,
    color: "#1e293b",
    marginBottom: 15,
    fontWeight: "700",
    textAlign: "center",
  },

  item: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  nome: {
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "500",
  },

  num: {
    fontSize: 13,
    color: "#475569",
    marginTop: 2,
  },
});
