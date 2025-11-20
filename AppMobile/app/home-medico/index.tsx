import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function HomeMedico() {
  // Simulação de usuário salvo (Adaptar para AsyncStorage depois!)
  const usuarioSalvo = {
    nome: "Doutor Exemplo",
    tipo: "medico"
  };

  const userName = usuarioSalvo?.nome || "Médico";
  const tipoUsuario = usuarioSalvo?.tipo;

  //useEffect(() => {
  //  if (tipoUsuario !== "medico") {
  //    alert("Acesso permitido apenas para médicos.");
  //    router.push("/escolha-cadastro");
  //  }
  //}, []);

    const menuItems: {
        label: string;
        icon: string;
        path: 
            | "/consultas/index"
            | "/prescricoes/index"
            | "/prescricao-medica"
            | "/bate-papo"
            | "/mapa/index"
            | "/perfil-medico/index"
            | "/configuracoes"
            | "/suporte";
    }[] = [
        { label: "Lista de Consultas", icon: "📋", path: "/consultas/index" },
        { label: "Prescrições Atuais", icon: "💊", path: "/prescricoes/index" },
        { label: "Criar Prescrição", icon: "✍️", path: "/prescricao-medica" },
        { label: "Chat", icon: "💬", path: "/bate-papo" },
        { label: "Mapa", icon: "📍", path: "/mapa/index" },
        { label: "Conta", icon: "👤", path: "/perfil-medico/index" },
        { label: "Configurações", icon: "⚙️", path: "/configuracoes" },
        { label: "Suporte", icon: "🛠️", path: "/suporte" },
    ];


  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MED-ORG</Text>
          <Text style={styles.headerTime}>
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </View>

        <Text style={styles.userName}>Olá, {userName}</Text>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.path as any)}
              style={[
                styles.menuItem,
                item.label === "Suporte" && styles.menuItemSuporte
              ]}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: "#ecf0f1",
    flexGrow: 1,
  },
  container: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
  },
  headerTime: {
    fontSize: 18,
    color: "#7f8c8d",
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#34495e",
    textAlign: "center",
    marginBottom: 30,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#2980b9",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    elevation: 3,
  },
  menuItemSuporte: {
    borderColor: "#e67e22",
  },
  menuIcon: {
    fontSize: 26,
    marginBottom: 8,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2980b9",
  },
});
