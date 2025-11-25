import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { supabase } from "../../supabase";

export default function CadastroSecretario() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    sexo: "",
    dataNascimento: "",
    endereco: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (key: string, value: string) => {
    if (key === "cpf") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
    }

    if (key === "telefone") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    }

    if (key === "dataNascimento") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  function formatarDataParaSQL(dataBR: string) {
    // de "25/03/2004" para "2004-03-25"
    const [dia, mes, ano] = dataBR.split("/");
    return `${ano}-${mes}-${dia}`;
  }

  const handleSubmit = async () => {
    if (formData.senha !== formData.confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      // ==============================================================
      // 1. Criar usuário no Supabase Auth
      // ==============================================================

      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.senha,
          options: {
            data: { role: "Secretario" },
          },
        });

      if (authError) {
        Alert.alert("Erro no cadastro", authError.message);
        return;
      }

      const user = authData.user;
      if (!user) {
        Alert.alert("Erro", "Usuário não pôde ser criado.");
        return;
      }

      // ==============================================================
      // 2. Inserir dados na tabela SECRETARIO no seu banco
      // ==============================================================

      const { error: insertError } = await supabase.from("secretario").insert({
        user_id: user.id,
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        cpf: formData.cpf.replace(/\D/g, ""),
        sexo: formData.sexo,
        data_de_nascimento: formatarDataParaSQL(formData.dataNascimento),
        endereco: formData.endereco,
        senha: formData.senha, // ⚠ Você deve criptografar isso no backend em produção
      });

      if (insertError) {
        Alert.alert("Erro", insertError.message);
        return;
      }

      Alert.alert("Sucesso!", "Cadastro realizado com sucesso.");
      router.push("/home-secretario");

    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Ocorreu um erro inesperado.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.voltarBtn} onPress={() => router.back()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Cadastro de Secretário</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={formData.nome}
          onChangeText={(v) => handleChange("nome", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={formData.email}
          keyboardType="email-address"
          onChangeText={(v) => handleChange("email", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={formData.telefone}
          keyboardType="phone-pad"
          onChangeText={(v) => handleChange("telefone", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={formData.cpf}
          keyboardType="numeric"
          onChangeText={(v) => handleChange("cpf", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Sexo (Masculino/Feminino/Outro)"
          value={formData.sexo}
          onChangeText={(v) => handleChange("sexo", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={formData.dataNascimento}
          keyboardType="numeric"
          onChangeText={(v) => handleChange("dataNascimento", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={formData.endereco}
          onChangeText={(v) => handleChange("endereco", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={formData.senha}
          onChangeText={(v) => handleChange("senha", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={formData.confirmarSenha}
          onChangeText={(v) => handleChange("confirmarSenha", v)}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#eef2ff",
    flexGrow: 1,
  },
  voltarBtn: {
    marginBottom: 20,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  voltarTexto: {
    fontSize: 18,
    color: "#3b82f6",
    fontWeight: "700",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: 28,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 14,
    marginVertical: 8,
    fontSize: 16,
    backgroundColor: "#f8fafc",
  },
  btn: {
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 12,
    marginTop: 18,
    shadowColor: "#3b82f6",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
