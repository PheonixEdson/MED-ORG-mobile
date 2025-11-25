import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
//import AsyncStorage from "@react-native-async-storage/async-storage";

// --- CORES PADRONIZADAS ---
const COLORS = {
  primary: "#007bff", // Azul principal
  secondary: "#6c757d", // Cinza secundário
  background: "#f8f9fa", // Fundo claro
  card: "#ffffff", // Fundo do cartão
  textPrimary: "#212529", // Texto escuro
  textSecondary: "#495057", // Texto cinza
  accent: "#28a745", // Verde para destaque/sucesso
  warning: "#ffc107", // Amarelo para aviso
};

// --- COMPONENTE HOME SECRETARIO ---
export default function HomeSecretario() {
  const router = useRouter();

  const [userName, setUserName] = useState("Secretário");
  const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
  const [hora, setHora] = useState(new Date());

  //useEffect(() => {
    //const carregarUsuario = async () => {
      //const usuarioString = await AsyncStorage.getItem("usuario");

      //if (usuarioString) {
        //const usuario = JSON.parse(usuarioString);
        //setUserName(usuario?.nome || "Secretário");
        //setTipoUsuario(usuario?.tipo);
      //}
    //};

    //carregarUsuario();
  //}, []);

  //useEffect(() => {
    //if (tipoUsuario && tipoUsuario !== "secretario") {
      //Alert.alert("Acesso negado", "Permitido apenas para secretários.");
      //router.replace("/escolha-cadastro");
    //}
  //}, [tipoUsuario]);

  useEffect(() => {
    const timer = setInterval(() => setHora(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { label: "Agendar Consulta", icon: "📅", path: "/agendar-consulta" },
    { label: "Listar Consultas", icon: "📋", path: "/listar-consultas" },
    { label: "Mapa", icon: "📍", path: "/mapa" },
    { label: "Configuração", icon: "⚙️", path: "/configuracoes" },
    { label: "Conta", icon: "👤", path: "/conta" },
    { label: "Suporte", icon: "🆘", path: "/suporte" },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MED-ORG</Text>
          <Text style={styles.headerTime}>
            {hora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </View>

        {/* NOME DO USUÁRIO */}
        <Text style={styles.userName}>Olá, {userName}</Text>

        {/* MENU */}
        <ScrollView contentContainerStyle={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                item.label === "Suporte" && styles.menuItemSuporte
              ]}
              onPress={() => router.push(item.path as any)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

// --- ESTILOS PADRONIZADOS ---
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  container: {
    width: "100%",
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
  },

  headerTime: {
    fontSize: 16,
    color: COLORS.textSecondary,
    alignSelf: 'flex-end',
  },

  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 30,
    paddingVertical: 10,
    backgroundColor: '#e9ecef', // Fundo sutil para o nome
    borderRadius: 8,
  },

  menuContainer: {
    paddingBottom: 40,
    width: "100%",
    flexDirection: "row", // Para usar flexWrap
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  menuItem: {
    width: "48%", // Ajustado para 48% para caber 2 por linha com espaço
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: "center", // Centralizado para um visual mais limpo
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },

  menuItemSuporte: {
    borderColor: COLORS.warning, // Cor de aviso para Suporte
  },

  menuIcon: {
    fontSize: 36,
    marginBottom: 10,
  },

  menuLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});
