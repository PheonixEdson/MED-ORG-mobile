import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
//import AsyncStorage from "@react-native-async-storage/async-storage";

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
          <Text style={styles.headerText}>MED-ORG</Text>
          <Text style={styles.hora}>
            {hora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </View>

        {/* NOME DO USUÁRIO */}
        <Text style={styles.usuarioNome}>{userName}</Text>

        {/* MENU */}
        <ScrollView contentContainerStyle={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 20,
    alignItems: "center",
  },

  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },

  header: {
    width: "100%",
    backgroundColor: "#1e3a8a",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#2563eb",
  },

  headerText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },

  hora: {
    color: "white",
    opacity: 0.8,
    fontSize: 16,
  },

  usuarioNome: {
    width: "100%",
    backgroundColor: "#e0e7ff",
    textAlign: "center",
    paddingVertical: 12,
    fontWeight: "600",
    fontSize: 20,
    color: "#1e3a8a",
    borderBottomColor: "#1e3a8a",
    borderBottomWidth: 2,
    marginBottom: 20,
  },

  menuContainer: {
    paddingBottom: 40,
    width: "100%",
    alignItems: "center",
  },

  menuItem: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#1e3a8a",
    padding: 20,
    borderRadius: 12,
    marginBottom: 18,
    elevation: 3,
  },

  menuIcon: {
    fontSize: 36,
    marginRight: 20,
    color: "#1e3a8a",
  },

  menuLabel: {
    fontSize: 20,
    color: "#1e3a8a",
    fontWeight: "600",
  },
});
