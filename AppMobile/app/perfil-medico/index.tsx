import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { User, Stethoscope, Phone, Calendar } from "phosphor-react-native";
import Parse from "parse/react-native.js";
import * as ImagePicker from "expo-image-picker";

export default function PerfilMedico() {
  const [dados, setDados] = useState(null);
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    try {
      const currentUser = await Parse.User.currentAsync();
      if (!currentUser) return;

      setDados({
        nome: currentUser.get("nome"),
        crm: currentUser.get("crm"),
        especialidade: currentUser.get("especialidade"),
        telefone: currentUser.get("telefone"),
        consultasHoje: currentUser.get("consultasHoje") || 0,
        proximasConsultas: currentUser.get("proximasConsultas") || 0,
      });

      const fotoPerfil = currentUser.get("fotoPerfil");
      if (fotoPerfil) setFoto(fotoPerfil.url());
    } catch (e) {
      console.log(e);
    }
  }

  async function alterarFoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
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
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: "#F7F7F7" }}>
      
      {/* Cabeçalho */}
      <View style={{
        alignItems: "center",
        paddingVertical: 40,
        backgroundColor: "white",
        borderRadius: 20,
        elevation: 3,
        marginBottom: 30
      }}>
        
        <TouchableOpacity onPress={alterarFoto}>
          {foto ? (
            <Image source={{ uri: foto }} style={{
              width: 90,
              height: 90,
              borderRadius: 50
            }} />
          ) : (
            <View style={{
              width: 90,
              height: 90,
              borderRadius: 50,
              backgroundColor: "#E5E7EB",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <User size={50} color="#9CA3AF" />
            </View>
          )}
        </TouchableOpacity>

        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
          {dados?.nome || "Carregando..."}
        </Text>
        <Text style={{ fontSize: 16, color: "#666" }}>
          Médico(a) – {dados?.especialidade}
        </Text>
      </View>

      {/* Informações */}
      <View style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 16,
        elevation: 3
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 15
        }}>Informações</Text>

        <Info label="CRM" value={dados?.crm} icon={<Stethoscope size={26} color="#3B82F6" />} />
        <Info label="Telefone" value={dados?.telefone} icon={<Phone size={26} color="#10B981" />} />
        <Info label="Consultas hoje" value={`${dados?.consultasHoje}`} icon={<Calendar size={26} color="#F97316" />} />
        <Info label="Próximas consultas" value={`${dados?.proximasConsultas}`} icon={<Calendar size={26} color="#6366F1" />} />
      </View>

    </ScrollView>
  );
}

function Info({ label, value, icon }) {
  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15
    }}>
      <View style={{ marginRight: 12 }}>{icon}</View>
      <View>
        <Text style={{ fontSize: 16, color: "#444" }}>{label}</Text>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>{value}</Text>
      </View>
    </View>
  );
}
