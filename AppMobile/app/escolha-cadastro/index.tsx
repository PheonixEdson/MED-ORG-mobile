import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function TelaEscolhaCadastro() {
  const router = useRouter();

  const navegarPara = (tipo: "Medico" | "Paciente" | "Secretario") => {
    const rotas = {
      Medico: "/cadastro-medico",
      Paciente: "/cadastro-paciente",
      Secretario: "/cadastro-secretario",
    } as const;

    router.push(rotas[tipo]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.voltarBtn} onPress={() => router.push("/home")}>
        <Text style={styles.voltarText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Escolha o tipo de cadastro</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navegarPara("Medico")}>
        <Text style={styles.botaoTexto}>Cadastro Médico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navegarPara("Paciente")}>
        <Text style={styles.botaoTexto}>Cadastro Paciente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navegarPara("Secretario")}>
        <Text style={styles.botaoTexto}>Cadastro Secretário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2ff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  voltarBtn: {
    position: "absolute",
    top: 22,
    left: 20,
  },

  voltarText: {
    fontSize: 18,
    color: "#3b82f6",
    fontWeight: "700",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: 45,
  },

  botao: {
    backgroundColor: "#3b82f6",
    width: "85%",
    maxWidth: 340,
    paddingVertical: 16,
    borderRadius: 14,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#3b82f6",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
