import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { User, ClipboardText, Phone, Calendar } from "phosphor-react-native";
import Parse from "parse/react-native.js";
import * as ImagePicker from "expo-image-picker";

export default function PerfilSecretario() {
  const [dados, setDados] = useState(null);
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    buscarDadosSecretario();
  }, []);

  async function buscarDadosSecretario() {
    try {
      const currentUser = await Parse.User.currentAsync();

      if (!currentUser) return;

      setDados({
        nome: currentUser.get("nome") || "Nome não definido",
        telefone: currentUser.get("telefone") || "Sem telefone",
        responsavelPor: currentUser.get("responsavelPor") || "—",
        atendimentosHoje: currentUser.get("atendimentosHoje") || 0,
        agendamentos: currentUser.get("agendamentos") || 0,
      });

      const fotoPerfil = currentUser.get("fotoPerfil");

      if (fotoPerfil) setFoto(fotoPerfil.url());
    } catch (error) {
      console.log("Erro ao buscar dados:", error);
    }
  }

  async function alterarFoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      const nomeArquivo = uri.substring(uri.lastIndexOf("/") + 1);
      const arquivo = new Parse.File(nomeArquivo, { uri });

      const currentUser = await Parse.User.currentAsync();
      currentUser.set("fotoPerfil", arquivo);

      await currentUser.save();

      setFoto(arquivo.url());
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#F7F7F7",
        flexGrow: 1,
      }}
    >
      {/* Header */}
      <View
        style={{
          alignItems: "center",
          marginBottom: 30,
          paddingVertical: 40,
          backgroundColor: "white",
          borderRadius: 20,
          elevation: 3,
        }}
      >
        {/* FOTO DO PERFIL */}
        <TouchableOpacity onPress={alterarFoto}>
          {foto ? (
            <Image
              source={{ uri: foto }}
              style={{
                width: 90,
                height: 90,
                borderRadius: 50,
                marginBottom: 10,
              }}
            />
          ) : (
            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 50,
                backgroundColor: "#E5E7EB",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <User size={50} color="#9CA3AF" />
            </View>
          )}
        </TouchableOpacity>

        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
          {dados?.nome || "Carregando..."}
        </Text>
        <Text style={{ fontSize: 16, color: "#666" }}>Secretário(a)</Text>
      </View>

      {/* Informações */}
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
          marginBottom: 20,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
          Informações
        </Text>

        <InfoLinha
          label="Telefone"
          value={dados?.telefone}
          icon={<Phone size={26} color="#3B82F6" />}
        />

        <InfoLinha
          label="Responsável por"
          value={dados?.responsavelPor}
          icon={<ClipboardText size={26} color="#10B981" />}
        />
      </View>

      {/* Rotina */}
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
          Rotina diária
        </Text>

        <InfoLinha
          label="Atendimentos realizados"
          value={`${dados?.atendimentosHoje} atendimentos hoje`}
          icon={<ClipboardText size={26} color="#3B82F6" />}
        />

        <InfoLinha
          label="Próximos agendamentos"
          value={`${dados?.agendamentos} consultas agendadas`}
          icon={<Calendar size={26} color="#F97316" />}
        />
      </View>
    </ScrollView>
  );
}

function InfoLinha({ label, value, icon }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
      }}
    >
      <View style={{ marginRight: 12 }}>{icon}</View>
      <View>
        <Text style={{ fontSize: 16, color: "#444" }}>{label}</Text>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>{value}</Text>
      </View>
    </View>
  );
}
