import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { User, Phone, MapPin, Calendar } from "phosphor-react-native";
import Parse from "parse/react-native.js";
import * as ImagePicker from "expo-image-picker";

export default function PerfilPaciente() {
  const [dados, setDados] = useState(null);
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const currentUser = await Parse.User.currentAsync();
      if (!currentUser) return;

      setDados({
        nome: currentUser.get("nome"),
        idade: currentUser.get("idade"),
        telefone: currentUser.get("telefone"),
        endereco: currentUser.get("endereco"),
        consultasRealizadas: currentUser.get("consultasRealizadas") || 0,
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
      aspect: [1, 1],
      quality: 1,
      allowsEditing: true,
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

      {/* Header */}
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
          {dados?.nome}
        </Text>
        <Text style={{ fontSize: 16, color: "#666" }}>
          Paciente — {dados?.idade} anos
        </Text>
      </View>

      {/* Informações */}
      <View style={{
        backgroundColor: "white",
        padding: 20,
        borderRadius: 16,
        elevation: 3
      }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
          Informações
        </Text>

        <Info label="Telefone" value={dados?.telefone} icon={<Phone size={26} color="#3B82F6" />} />
        <Info label="Endereço" value={dados?.endereco} icon={<MapPin size={26} color="#10B981" />} />
        <Info label="Consultas realizadas" value={`${dados?.consultasRealizadas}`} icon={<Calendar size={26} color="#F97316" />} />
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
