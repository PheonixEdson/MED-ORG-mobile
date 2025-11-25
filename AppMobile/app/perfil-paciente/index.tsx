import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { User, Phone, MapPin, Calendar, PhoneIcon, MapPinIcon, CalendarIcon } from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../supabase";
import { useRouter } from "expo-router";

export default function PerfilPaciente() {
  const [dados, setDados] = useState<any>(null);
  const [foto, setFoto] = useState<string | null>(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const { data: {user}, error } = await supabase.auth.getUser();
      if (error || !user) return;

      const userId = user.id;

      const { data, error: queryError } = await supabase
        .from("paciente")
        .select("*")
        .eq("id", userId)
        .single();

      if (queryError) {
        console.log("Erro ao buscar dados:", queryError.message);
        return;
      }

      setDados(data);
      setFoto(data.fotoPerfil || null);
    } catch (e) {
      console.log(e);
    }
  }

  async function alterarFoto() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) return;

      const uri = result.assets[0].uri;
      const nomeArquivo = uri.substring(uri.lastIndexOf("/") + 1);

      // Busca user atual
      const { data: {user}, error } = await supabase.auth.getUser();
      if (error || !user) return;

      const userId = user.id;

      // Faz upload da imagem para Supabase Storage
      const response = await fetch(uri);
      const blob = await response.blob();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("perfil-pacientes")
        .upload(nomeArquivo, blob, { upsert: true });

      if (uploadError) {
        console.log("Erro ao enviar foto:", uploadError.message);
        Alert.alert("Erro", "Não foi possível enviar a foto.");
        return;
      }

      // Pega URL pública
      const { data: urlData } = supabase.storage
        .from("perfil-pacientes")
        .getPublicUrl(nomeArquivo);

      const publicUrl = urlData.publicUrl;

      // Atualiza no banco de dados
      const { error: updateError } = await supabase
        .from("paciente")
        .update({ fotoPerfil: publicUrl })
        .eq("id", userId);

      if (updateError) {
        console.log("Erro ao atualizar foto no banco:", updateError.message);
        return;
      }

      setFoto(publicUrl);
    } catch (e) {
      console.log(e);
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
          {dados?.nome || "Carregando..."}
        </Text>
        <Text style={{ fontSize: 16, color: "#666" }}>
          Paciente — {dados?.idade || "-"} anos
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

        <Info label="Telefone" value={dados?.telefone} icon={<PhoneIcon size={26} color="#3B82F6" />} />
        <Info label="Endereço" value={dados?.endereco} icon={<MapPinIcon size={26} color="#10B981" />} />
        <Info label="Consultas realizadas" value={`${dados?.consultasRealizadas || 0}`} icon={<CalendarIcon size={26} color="#F97316" />} />
        <Info label="Próximas consultas" value={`${dados?.proximasConsultas || 0}`} icon={<CalendarIcon size={26} color="#6366F1" />} />
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

