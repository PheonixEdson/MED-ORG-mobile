import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ConfiguracaoScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<any>(null);

  //useEffect(() => {
    //async function carregarUsuario() {
      //const user = await AsyncStorage.getItem("usuario");
      //setUsuario(user ? JSON.parse(user) : null);
    //}
    //carregarUsuario();
  //}, []);

  if (!usuario) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando configurações...</Text>
      </View>
    );
  }

  const { nome, tipo } = usuario;

  return (
    <ScrollView contentContainerStyle={styles.configWrapper}>
      <View style={styles.configContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>⚙️ Configurações</Text>
          <Text style={styles.headerUser}>Usuário: {nome} ({tipo})</Text>
        </View>

        <View style={styles.options}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Alterar Senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Notificações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Preferências de Tema</Text>
          </TouchableOpacity>

          {tipo === "medico" && (
            <>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Gerenciar Agenda</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Disponibilidade</Text>
              </TouchableOpacity>
            </>
          )}

          {tipo === "paciente" && (
            <>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Histórico Médico</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Convênios</Text>
              </TouchableOpacity>
            </>
          )}

          {tipo === "secretario" && (
            <>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Gerenciar Consultas</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionText}>Relatórios</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
          <Text style={styles.btnVoltarText}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  configWrapper: {
    padding: 20,
    backgroundColor: "#f4f6fb",
    minHeight: "100%",
    alignItems: "center",
  },

  configContainer: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 12,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2563eb",
  },

  headerUser: {
    color: "#6b7280",
    marginTop: 4,
    fontSize: 15,
  },

  options: {
    gap: 12,
  },

  option: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    backgroundColor: "#f9fafb",
  },

  optionText: {
    fontSize: 16,
    color: "#333",
  },

  btnVoltar: {
    marginTop: 20,
    alignSelf: "flex-end",
    backgroundColor: "#e5e7eb",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  btnVoltarText: {
    fontSize: 16,
    color: "#333",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    fontSize: 18,
    color: "#555",
  },
});
