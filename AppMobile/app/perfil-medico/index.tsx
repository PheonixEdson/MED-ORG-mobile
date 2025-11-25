import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function PerfilMedico() {
  const router = useRouter();
  
  const medico = {
    nome: "Dr. João Silva",
    especialidade: "Cardiologia",
    crm: "CRM-12345",
    email: "drjoao@medorg.com",
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Perfil do Médico</Text>
        </View>

        {/* Card de Perfil */}
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>{medico.nome}</Text>
          <Text style={styles.profileInfo}>Especialidade: {medico.especialidade}</Text>
          <Text style={styles.profileInfo}>CRM: {medico.crm}</Text>
          <Text style={styles.profileInfo}>E-mail: {medico.email}</Text>
        </View>

        {/* Botões */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/configuracoes")}
          >
            <Text style={styles.buttonText}>Configurações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.logoutButton]}>
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: "#F5F7FA",
    flexGrow: 1,
  },

  container: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },

  header: {
    borderBottomWidth: 1,
    borderColor: "#E3E6EA",
    paddingBottom: 12,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1F2D3D",
    textAlign: "center",
  },

  profileCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 30,
  },

  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 10,
  },

  profileInfo: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
  },

  buttonsContainer: {
    gap: 15,
  },

  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  logoutButton: {
    backgroundColor: "#ffe9e9",
    borderColor: "#e74c3c",
    borderWidth: 2,
  },
  logoutText: {
    color: "#e74c3c",
    fontSize: 16,
    fontWeight: "700",
  },
});
