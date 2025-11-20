import { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomePaciente() {
  const router = useRouter();

  //❗LocalStorage do navegador NÃO existe no mobile.
  // Usamos AsyncStorage, mas por enquanto vamos mockar.
  const usuarioSalvo = { nome: "Usuário", tipo: "paciente" };

  const userName = usuarioSalvo?.nome || "Usuário";
  const tipoUsuario = usuarioSalvo?.tipo;

  //useEffect(() => {
    //if (tipoUsuario !== "paciente") {
      //alert("Acesso permitido apenas para pacientes.");
      //router.replace("/home");
    //}
  //}, []);

  const menuItems = [
    { label: "Falar com Médicos", icon: "💬", path: "/paciente/chat" },
    { label: "Agendamentos", icon: "📅", path: "/paciente/servicos-oferecidos" },
    { label: "Prescrições Atuais", icon: "💊", path: "/paciente/prescricao" },
    { label: "Mapa", icon: "📍", path: "/paciente/mapa" },
    { label: "Conta", icon: "👤", path: "/paciente/conta" },
    { label: "Configurações", icon: "⚙️", path: "/paciente/configuracoes" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MED-ORG</Text>
        <Text style={styles.time}>
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </View>

      {/* Nome do usuário */}
      <View style={styles.userBox}>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Menu */}
      <View style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.path)}
            style={styles.menuItem}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Suporte */}
        <TouchableOpacity
          onPress={() => router.push("/suporte")}
          style={[styles.menuItem, styles.suporteItem]}
        >
          <Text style={styles.menuIcon}>🆘</Text>
          <Text style={styles.menuLabel}>Suporte</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e0e7ff",
  },

  header: {
    backgroundColor: "#3b82f6",
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  time: {
    color: "#fff",
    fontSize: 16,
  },

  userBox: {
    backgroundColor: "#dbeafe",
    padding: 16,
    borderRadius: 10,
    marginBottom: 25,
  },

  userName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e3a8a",
  },

  menuGrid: {
    flexDirection: "column",
    gap: 16,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#3b82f6",
    shadowColor: "#3b82f6",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },

  menuIcon: {
    fontSize: 30,
    marginRight: 18,
  },

  menuLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e40af",
  },

  suporteItem: {
    borderColor: "#dc2626",
    backgroundColor: "#fee2e2",
  },
});
