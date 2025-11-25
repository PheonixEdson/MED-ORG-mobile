// HomeMedico.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const PLACEHOLDER_LOCAL_FILE = "file:///mnt/data/A_digital_screenshot_of_a_mobile_application_home_.png";

const COLORS = {
  primary: "#007bff",
  secondary: "#6c757d",
  background: "#f8f9fa",
  card: "#ffffff",
  textPrimary: "#212529",
  textSecondary: "#495057",
  accent: "#28a745",
  warning: "#ffc107",
};

type MenuItem = {
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
};

export default function HomeMedico() {
  const router = useRouter();

  const [nome, setNome] = useState<string>("");
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const menuItems: MenuItem[] = [
    { label: "Lista de Consultas", icon: "📋", path: "/consultas/index" },
    { label: "Prescrições Atuais", icon: "💊", path: "/prescricoes/index" },
    { label: "Criar Prescrição", icon: "✍️", path: "/prescricao-medica" },
    { label: "Chat", icon: "💬", path: "/bate-papo" },
    { label: "Mapa", icon: "📍", path: "/mapa/index" },
    { label: "Conta", icon: "👤", path: "/perfil-medico/index" },
    { label: "Configurações", icon: "⚙️", path: "/configuracoes" },
    { label: "Suporte", icon: "🛠️", path: "/suporte" },
  ];

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    try {
      // tenta obter usuário atual (supondo login já realizado)
      // use currentAsync se sua versão do Parse o suportar:
      const currentUser = Parse.User.current ? Parse.User.current() : null;
      if (!currentUser) {
        // se não tiver usuário, redireciona para tela de login (opcional)
        setNome("Médico");
        setLoading(false);
        return;
      }

      const nomeUsuario = currentUser.get("nome") || currentUser.get("username") || "Médico";
      setNome(nomeUsuario);

      // busca fotoPerfil (campo Parse File)
      const fotoPerfil = currentUser.get("fotoPerfil");
      if (fotoPerfil && typeof fotoPerfil.url === "function") {
        setFotoUri(fotoPerfil.url());
      } else {
        // usar placeholder local se não tiver foto
        setFotoUri(PLACEHOLDER_LOCAL_FILE);
      }
    } catch (error) {
      console.log("Erro ao carregar usuário:", error);
      setFotoUri(PLACEHOLDER_LOCAL_FILE);
      setNome("Médico");
    } finally {
      setLoading(false);
    }
  }

  async function alterarFoto() {
    try {
      // pedir permissão e abrir galeria
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permissão necessária", "Permita acesso à galeria para alterar a foto.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const uri = result.assets[0].uri;
      const filename = uri.split("/").pop() || `photo-${Date.now()}.jpg`;

      // criar Parse.File e armazenar no usuário
      const file = new Parse.File(filename, { uri });
      await file.save();

      const currentUser = Parse.User.current ? Parse.User.current() : null;
      if (!currentUser) {
        Alert.alert("Erro", "Usuário não autenticado.");
        return;
      }

      currentUser.set("fotoPerfil", file);
      await currentUser.save();

      // atualizar URI mostrada (o Parse File pode ter URL pública)
      setFotoUri(file.url());
      Alert.alert("Sucesso", "Foto atualizada.");
    } catch (error) {
      console.log("Erro ao alterar foto:", error);
      Alert.alert("Erro", "Não foi possível enviar a foto.");
    }
  }

  if (loading) {
    return (
      <View style={loadingStyles.container}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MED-ORG</Text>

          <View style={styles.rightHeader}>
            <Text style={styles.headerTime}>
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Text>
            {/* Avatar pequeno no canto superior direito opcional */}
            <TouchableOpacity onPress={() => router.push("/perfil-medico/index")}>
              <Image
                source={
                  fotoUri
                    ? // Parse pode retornar http(s) ou usamos placeholder local (file:///...)
                      { uri: fotoUri }
                    : { uri: PLACEHOLDER_LOCAL_FILE }
                }
                style={styles.headerAvatar}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Perfil grande */}
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={alterarFoto} style={styles.avatarWrapper}>
            <Image
              source={
                fotoUri ? { uri: fotoUri } : { uri: PLACEHOLDER_LOCAL_FILE }
              }
              style={styles.avatar}
            />
            <Text style={styles.avatarLabel}>Alterar foto</Text>
          </TouchableOpacity>

          <Text style={styles.userName}>Olá, {nome}</Text>

          <Text style={styles.userRole}>Médico(a)</Text>
        </View>

        {/* Menu */}
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.path as any)}
              style={[styles.menuItem, item.label === "Suporte" && styles.menuItemSuporte]}
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

/* Estilos */
const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  container: {
    backgroundColor: COLORS.card,
    padding: 18,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginRight: 10,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#eee",
  },

  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarWrapper: {
    alignItems: "center",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 10,
    backgroundColor: "#f1f5f9",
  },
  avatarLabel: {
    fontSize: 12,
    color: COLORS.primary,
    marginBottom: 6,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  userRole: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 6,
  },
  menuItem: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 2,
  },
  menuItemSuporte: {
    borderColor: COLORS.warning,
  },
  menuIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
});

/* estilos de loading simples */
const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
