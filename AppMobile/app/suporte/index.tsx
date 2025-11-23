import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Suporte() {
  const router = useRouter();

  const contatos = [
    { nome: "Arthur Felipe", num: "(81) xxxxx-xxxx" },
    { nome: "Antônio Edson", num: "(81) xxxxx-xxxx" },
    { nome: "Dacio da Silva", num: "(81) xxxxx-xxxx" },
    { nome: "David Cândido", num: "(81) xxxxx-xxxx" },
    { nome: "Gabriel Araujo", num: "(81) xxxxx-xxxx" },
    { nome: "Lucas Mourato", num: "(81) xxxxx-xxxx" },
    { nome: "Matheus Aguilar", num: "(81) xxxxx-xxxx" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.voltarBtn} onPress={() => router.back()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      {/* Card com contatos */}
      <View style={styles.card}>
        <Text style={styles.titulo}>Lista de Contatos para suporte:</Text>

        {contatos.map((c, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.nome}>- {c.nome}:</Text>
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
    paddingTop: 80,
    paddingBottom: 40,
    backgroundColor: "#ecf0f1",
    minHeight: "100%",
  },

  voltarBtn: {
    alignSelf: "flex-start",
    marginLeft: 20,
    padding: 10,
    marginBottom: 20,
  },

  voltarTexto: {
    fontSize: 18,
    color: "#1e3a8a",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    width: 290,
    padding: 30,
    borderRadius: 10,
  },

  titulo: {
    fontSize: 18,
    color: "#000",
    marginBottom: 10,
    fontWeight: "bold",
  },

  item: {
    marginBottom: 8,
  },

  nome: {
    fontSize: 14,
    color: "#000",
  },

  num: {
    fontSize: 12,
    color: "#000",
  },
});
