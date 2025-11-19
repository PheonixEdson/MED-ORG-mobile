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
        <View style={styles.telaEscolha}>
        <TouchableOpacity style={styles.voltarBtn} onPress={() => router.push("/home")}>
            <Text style={styles.voltarText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titleEscolha}>Escolha o tipo de cadastro</Text>

        <TouchableOpacity style={styles.botaoEscolha} onPress={() => navegarPara("Medico")}>
            <Text style={styles.botaoTexto}>Cadastro Médico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoEscolha} onPress={() => navegarPara("Paciente")}>
            <Text style={styles.botaoTexto}>Cadastro Paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoEscolha} onPress={() => navegarPara("Secretario")}>
            <Text style={styles.botaoTexto}>Cadastro Secretário</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  telaEscolha: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#f0f2f5",
  },

  titleEscolha: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 50,
    textAlign: "center",
  },

  botaoEscolha: {
    backgroundColor: "#1976D2",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 35,
    width: "80%",
    maxWidth: 320,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  botaoTexto: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },

  voltarBtn: {
    position: "absolute",
    top: 20,
    left: 20,
  },

  voltarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1976d2",
  },
});
