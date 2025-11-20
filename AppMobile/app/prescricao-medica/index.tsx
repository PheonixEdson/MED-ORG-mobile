import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function PrescricaoMedica() {
  const router = useRouter();

  //Aqui você pode implementar a verificação do tipo de usuário (quando estiver usando AsyncStorage)
  const tipoUsuario = "medico"; // temporário

  const [form, setForm] = useState({
    médico: "",
    hospital: "",
    endereçoHospital: "",
    telefone: "",
    dataPrescrição: "",
    paciente: "",
    nascimento: "",
    endereçoPaciente: "",
    medicamento: "",
    dosagem: "",
    duração: "",
    observações: "",
  });

  const handleChange = (campo: string, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSalvar = () => {
    console.log("Prescrição salva:", form);
    Alert.alert("Sucesso", "Prescrição salva com sucesso!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.voltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Prescrição</Text>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        {Object.entries(form).map(([campo, valor]) => (
          <TextInput
            key={campo}
            style={styles.input}
            value={valor}
            onChangeText={(text) => handleChange(campo, text)}
            placeholder={formatarPlaceholder(campo)}
            placeholderTextColor="#888"
          />
        ))}

        {/* Botão Salvar */}
        <View style={styles.botoes}>
          <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
            <Text style={styles.botaoTexto}>Salvar Prescrição</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function formatarPlaceholder(campo: string) {
  const label = campo.charAt(0).toUpperCase() + campo.slice(1);
  return label.replace(/([A-Z])/g, " $1").trim();
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: "#f9f9f9",
    minHeight: "100%",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 600,
    marginBottom: 10,
  },

  voltar: {
    fontSize: 26,
    color: "#007bff",
    marginRight: 10,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007bff",
    flex: 1,
    textAlign: "center",
    marginRight: 26,
  },

  form: {
    marginTop: 10,
    width: "100%",
    maxWidth: 600,
  },

  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    fontSize: 14,
    backgroundColor: "#fff",
    marginBottom: 12,
  },

  botoes: {
    marginTop: 20,
    alignItems: "center",
  },

  botaoSalvar: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 6,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
