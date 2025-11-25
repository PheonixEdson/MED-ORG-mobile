import { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";

import { supabase } from "../../supabase";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [manterConectado, setManterConectado] = useState(false);

  const router = useRouter();

  // =========================================================
  // LOGIN SUPABASE
  // =========================================================
  const handleEntrar = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha email e senha.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      Alert.alert("Erro", error.message);
      return;
    }

    // Login OK → redireciona
    router.push("/escolha-cadastro");
  };

  // =========================================================
  // EXCLUIR CONTA (auth + tabelas ligadas)
  // =========================================================
  const excluirConta = async () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza que deseja excluir sua conta? Esta ação é irreversível.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              // 1. Buscar usuário logado
              const {
                data: { user },
              } = await supabase.auth.getUser();

              if (!user) {
                Alert.alert("Erro", "Você precisa estar logado.");
                return;
              }

              // 2. Deletar tabelas ligadas (paciente, medico, secretario)
              // Atenção: precisa RLS permitir delete do próprio registro!
              await supabase.from("paciente").delete().eq("user_id", user.id);
              await supabase.from("medico").delete().eq("user_id", user.id);
              await supabase
                .from("secretario")
                .delete()
                .eq("user_id", user.id);

              // 3. Deletar o usuário do Supabase Auth (admin API)
              const { error: delError } = await supabase.auth.admin.deleteUser(
                user.id
              );

              if (delError) {
                Alert.alert("Erro", delError.message);
                return;
              }

              Alert.alert("Conta excluída com sucesso!");
              setEmail("");
              setSenha("");
            } catch (e) {
              console.log(e);
              Alert.alert("Erro", "Falha ao excluir a conta.");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.telaLogin}>
      <Image
        source={require("../../assets/images/Med-org.jpg")}
        style={styles.logo}
        resizeMode="cover"
      />

      <Text style={styles.title}>Login</Text>

      <View style={styles.formCard}>
        {/* INPUTS */}
        <TextInput
          placeholder="Digite seu email"
          placeholderTextColor="#6b7280"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#6b7280"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />

        {/* BOTÕES */}
        <View style={styles.actions}>
          <Link href="./escolha-cadastro" asChild>
            <TouchableOpacity style={[styles.btn, styles.btnNeutral]}>
              <Text style={styles.btnTextNeutral}>Criar Conta</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary]}
            onPress={handleEntrar}
          >
            <Text style={styles.btnTextPrimary}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnDanger]}
            onPress={excluirConta}
          >
            <Text style={styles.btnTextDanger}>Excluir Conta</Text>
          </TouchableOpacity>
        </View>

        {/* CHECKBOX */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => setManterConectado(!manterConectado)}
        >
          <View
            style={[styles.checkbox, manterConectado && styles.checkboxChecked]}
          />
          <Text style={styles.checkboxLabel}>Manter-me Conectado</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  telaLogin: {
    minHeight: "100%",
    backgroundColor: "#f4f6fb",
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 24,
    alignItems: "center",
  },

  logo: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 20,
  },

  formCard: {
    width: "100%",
    maxWidth: 560,
    backgroundColor: "#fff",
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    elevation: 6,
    gap: 14,
  },

  input: {
    backgroundColor: "#fff",
    borderColor: "#d1d5db",
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 14,
    color: "#222",
  },

  actions: {
    flexDirection: "column",
    gap: 10,
  },

  btn: {
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  /* PRIMARY */
  btnPrimary: { backgroundColor: "#2563eb" },
  btnTextPrimary: { color: "#fff", fontWeight: "700" },

  /* NEUTRAL */
  btnNeutral: { backgroundColor: "#e5e7eb" },
  btnTextNeutral: { color: "#111827", fontWeight: "700" },

  /* DANGER */
  btnDanger: { backgroundColor: "#e11d48" },
  btnTextDanger: { color: "#fff", fontWeight: "700" },

  /* CHECKBOX */
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#6b7280",
    borderRadius: 4,
  },

  checkboxChecked: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  checkboxLabel: {
    fontSize: 14,
    color: "#222",
  },
});
