import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

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

  const handleSubmit = () => {
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    alert("Cadastro realizado com sucesso!");
    router.push("/home-secretario");
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
          placeholder="Sexo (M/F)"
          value={formData.sexo}
          onChangeText={(v) => handleChange("sexo", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento"
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

// erro corrigido