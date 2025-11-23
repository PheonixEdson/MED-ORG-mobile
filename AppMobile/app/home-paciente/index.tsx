import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function HomePaciente() {
  const router = useRouter();

  const userName = "Paciente"; // depois conectamos com AsyncStorage
  const tipoUsuario = "paciente";

  const menuItems = [
    { label: "Falar com Médicos", icon: "💬", path: "/bate-papo" },
    { label: "Agendamentos", icon: "📅", path: "/servicos" },
    { label: "Prescrições Atuais", icon: "💊", path: "/prescricao-paciente" },
    { label: "Mapa", icon: "📍", path: "/mapa" },
    { label: "Conta", icon: "👤", path: "/perfil-paciente" },
    { label: "Configurações", icon: "⚙️", path: "/configuracoes" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>MED-ORG</Text>
        <Text style={styles.timeText}>
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>

      {/* Nome do usuário */}
      <Text style={styles.userName}>{userName}</Text>

      {/* Menu */}
      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.path as any)}
            style={styles.menuItem}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.menuItem, styles.suporteButton]}
          onPress={() => router.push("/suporte")}
        >
          <Text style={styles.menuIcon}>🆘</Text>
          <Text style={styles.menuLabel}>Suporte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e7ff",
  },
  header: {
    backgroundColor: "#1e3a8a",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  timeText: {
    color: "white",
    fontSize: 16,
  },
  userName: {
    backgroundColor: "#dbeafe",
    padding: 15,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#1e3a8a",
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    justifyContent: "center",
  },
  menuItem: {
    width: "42%",
    padding: 20,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3b82f6",
  },
  menuIcon: {
    fontSize: 30,
  },
  menuLabel: {
    marginTop: 10,
    fontWeight: "600",
    fontSize: 16,
    color: "#1e40af",
  },
  suporteButton: {
    borderColor: "#dc2626",
    backgroundColor: "#fee2e2",
  },
});
