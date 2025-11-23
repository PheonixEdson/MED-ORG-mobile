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
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    console.log("Cadastro de secretário enviado:", formData);
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
          onChangeText={(v) => handleChange("cpf", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Sexo"
          value={formData.sexo}
          onChangeText={(v) => handleChange("sexo", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={formData.dataNascimento}
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
    backgroundColor: "#f4f6fb",
    flexGrow: 1,
  },
  voltarBtn: {
    marginBottom: 15,
  },
  voltarTexto: {
    fontSize: 18,
    color: "#2563eb",
    fontWeight: "700",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2563eb",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
