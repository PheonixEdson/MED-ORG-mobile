import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function CadastroMedico() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    sexo: "",
    especializacao: "",
    crm: "",
    formacao: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (campo: string, valor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = () => {
    const senhaValida = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;

    if (formData.senha !== formData.confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    if (!senhaValida.test(formData.senha)) {
      Alert.alert("Erro", "A senha deve conter ao menos: \n• 1 letra maiúscula\n• 1 símbolo especial\n• Min. 6 caracteres");
      return;
    }

    console.log("Cadastro médico enviado:", formData);
    Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
    router.push("/home-medico");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.voltarBtn} onPress={() => router.back()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Cadastro Médico</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={formData.nome}
          onChangeText={(t) => handleChange("nome", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(t) => handleChange("email", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sexo"
          value={formData.sexo}
          onChangeText={(t) => handleChange("sexo", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Especialização"
          value={formData.especializacao}
          onChangeText={(t) => handleChange("especializacao", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="CRM"
          value={formData.crm}
          onChangeText={(t) => handleChange("crm", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Formação"
          value={formData.formacao}
          onChangeText={(t) => handleChange("formacao", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={formData.senha}
          onChangeText={(t) => handleChange("senha", t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={formData.confirmarSenha}
          onChangeText={(t) => handleChange("confirmarSenha", t)}
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
    marginBottom: 10,
  },
  voltarTexto: {
    fontSize: 18,
    color: "#2563eb",
    fontWeight: "bold",
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
