import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { User, Stethoscope, Phone, Calendar, StethoscopeIcon, PhoneIcon, CalendarIcon } from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../supabase";
import { useRouter } from "expo-router";

export default function PerfilMedico({ userId }: { userId: string }) {
  const [dados, setDados] = useState<any>(null);
  const [foto, setFoto] = useState<string | null>(null);

  useEffect(() => {
    buscarDados();
  }, []);

  async function buscarDados() {
    try {
      const { data, error } = await supabase
        .from("medico")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.log("Erro ao buscar dados:", error.message);
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

      // Envia a foto para o Supabase Storage
      const response = await fetch(uri);
      const blob = await response.blob();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("perfil-medicos") // nome do bucket
        .upload(nomeArquivo, blob, { upsert: true });

      if (uploadError) {
        console.log("Erro ao enviar foto:", uploadError.message);
        Alert.alert("Erro", "Não foi possível enviar a foto.");
        return;
      }

      // Pega a URL pública da foto
      const { data: urlData } = supabase.storage
        .from("perfil-medicos")
        .getPublicUrl(nomeArquivo);
      
      const publicUrl = urlData.publicUrl;

      // Atualiza no banco de dados
      const { error: updateError } = await supabase
        .from("medico")
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

        <Info label="CRM" value={dados?.crm} icon={<StethoscopeIcon size={26} color="#3B82F6" />} />
        <Info label="Telefone" value={dados?.telefone} icon={<PhoneIcon size={26} color="#10B981" />} />
        <Info label="Consultas hoje" value={`${dados?.consultasHoje}`} icon={<CalendarIcon size={26} color="#F97316" />} />
        <Info label="Próximas consultas" value={`${dados?.proximasConsultas}`} icon={<CalendarIcon size={26} color="#6366F1" />} />
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
