import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function PrescricaoPaciente() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.voltarBtn} onPress={() => router.back()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Prescrição</Text>

      <ScrollView style={styles.card} showsVerticalScrollIndicator={false}>
        <Text style={styles.texto}><Text style={styles.negrito}>Nome do Médico:</Text> Dr. [Nome do Médico]</Text>
        <Text style={styles.texto}><Text style={styles.negrito}>Hospital:</Text> [Nome do Hospital]</Text>
        <Text style={styles.texto}><Text style={styles.negrito}>Endereço:</Text> [Endereço do Hospital]</Text>
        <Text style={styles.texto}><Text style={styles.negrito}>Telefone:</Text> [Telefone]</Text>

        <View style={styles.linha} />

        <Text style={styles.texto}><Text style={styles.negrito}>Data:</Text> [Data da Prescrição]</Text>
        <Text style={styles.texto}><Text style={styles.negrito}>Nome do Paciente:</Text> [Nome do Paciente]</Text>
        <Text style={styles.texto}><Text style={styles.negrito}>Data de Nascimento:</Text> [Data de Nascimento]</Text>
        <Text style={styles.texto}><Text style={styles.negrito}>Endereço:</Text> [Endereço do Paciente]</Text>

        <View style={styles.linha} />

        <Text style={styles.texto}><Text style={styles.negrito}>Medicamento:</Text> [Nome do Medicamento]</Text>
        <Text style={styles.texto}><Text style={styles.negrito}>Dosagem:</Text> [Dosagem Prescrita]</Text>
        <Text style={styles.texto}><Text style={styles.negrito}>Duração do Tratamento:</Text> [Número de dias]</Text>

        <View style={styles.linha} />

        <Text style={styles.texto}><Text style={styles.negrito}>Observações:</Text> [Observações adicionais]</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: "#f0f2f5",
    minHeight: "100%",
    alignItems: "center",
  },

  voltarBtn: {
    position: "absolute",
    top: 20,
    left: 20,
  },

  voltarTexto: {
    fontSize: 20,
    color: "#1e40af",
    fontWeight: "bold",
  },

  titulo: {
    fontSize: 28,
    marginTop: 10,
    marginBottom: 25,
    fontWeight: "bold",
    color: "#1e40af",
  },

  card: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 700,
    padding: 25,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#1e40af",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    maxHeight: "75%",
  },

  texto: {
    fontSize: 16,
    color: "#1e62afff",
    marginVertical: 6,
    lineHeight: 22,
  },

  negrito: {
    fontWeight: "bold",
  },

  linha: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },
});
