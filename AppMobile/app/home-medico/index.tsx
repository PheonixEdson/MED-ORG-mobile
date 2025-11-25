import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";

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

// --- COMPONENTE HOME MEDICO ---
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

// --- ESTILOS PADRONIZADOS ---
const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  container: {
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
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: "48%",
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
