import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../supabase";

export default function CadastroPaciente() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    sexo: "",
    dataNascimento: "",
    cpf: "",
    telefone: "",
    endereco: "",
    possuiPlano: false,
    fornecedoraPlano: "",
  });

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // 🔹 Converte 25/03/2004 -> 2004-03-25 (PostgreSQL)
  const formatarDataParaSQL = (dataBR: string) => {
    const [dia, mes, ano] = dataBR.split("/");
    return `${ano}-${mes}-${dia}`;
  };

  const handleSubmit = async () => {
    try {
      if (loading) return;

      if (!formData.email || !formData.senha) {
        Alert.alert("Erro", "E-mail e senha são obrigatórios.");
        return;
      }

      setLoading(true);

      // 1️⃣ Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
      });

      if (authError) {
        Alert.alert("Erro no cadastro", authError.message);
        setLoading(false);
        return;
      }

      const user = authData.user;
      if (!user) {
        Alert.alert("Erro", "Falha ao criar usuário.");
        setLoading(false);
        return;
      }

      // 2️⃣ Inserir dados do paciente na tabela `paciente`
      const { error: insertError } = await supabase.from("paciente").insert({
        user_id: user.id,
        nome: formData.nome,
        sexo: formData.sexo,
        email: formData.email,
        cpf: formData.cpf.replace(/\D/g, ""),
        telefone: formData.telefone.replace(/\D/g, ""),
        endereco: formData.endereco,
        data_de_nascimento: formatarDataParaSQL(formData.dataNascimento),
        possui_plano: formData.possuiPlano,
        fornecedora_do_plano: formData.possuiPlano
          ? formData.fornecedoraPlano
          : null,
      });

      if (insertError) {
        Alert.alert("Erro ao salvar dados", insertError.message);
        setLoading(false);
        return;
      }

      Alert.alert("Sucesso!", "Paciente cadastrado com sucesso!");
      router.push("/home-paciente");
    } catch (err) {
      Alert.alert("Erro inesperado", "Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.voltarBtn} onPress={() => router.back()}>
        <Text style={styles.voltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Cadastro de Paciente</Text>

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
          placeholder="Senha"
          secureTextEntry
          value={formData.senha}
          onChangeText={(v) => handleChange("senha", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Sexo"
          value={formData.sexo}
          onChangeText={(v) => handleChange("sexo", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (dd/mm/aaaa)"
          value={formData.dataNascimento}
          onChangeText={(v) => handleChange("dataNascimento", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={formData.cpf}
          onChangeText={(v) => handleChange("cpf", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={formData.telefone}
          onChangeText={(v) => handleChange("telefone", v)}
        />

        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={formData.endereco}
          onChangeText={(v) => handleChange("endereco", v)}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Possui plano de saúde?</Text>
          <Switch
            value={formData.possuiPlano}
            onValueChange={(v) => handleChange("possuiPlano", v)}
          />
        </View>

        {formData.possuiPlano && (
          <TextInput
            style={styles.input}
            placeholder="Fornecedora do Plano"
            value={formData.fornecedoraPlano}
            onChangeText={(v) => handleChange("fornecedoraPlano", v)}
          />
        )}

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Text>
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
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  switchLabel: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
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
