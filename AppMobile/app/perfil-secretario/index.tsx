import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { ClipboardTextIcon, CalendarIcon, PhoneIcon, UserIcon } from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../supabase";

export default function PerfilSecretario() {
  const [dados, setDados] = useState<any>(null);
  const [foto, setFoto] = useState<string | null>(null);

  useEffect(() => {
    buscarDadosSecretario();
  }, []);

  async function buscarDadosSecretario() {
    try {
      // Pega usuário logado
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return;

      const userId = data.user.id;

      const { data: secretarioData, error: queryError } = await supabase
        .from("secretario")
        .select("*")
        .eq("id", userId)
        .single();

      if (queryError) {
        console.log("Erro ao buscar dados:", queryError.message);
        return;
      }

      setDados(secretarioData);
      setFoto(secretarioData.fotoPerfil || null);
    } catch (e) {
      console.log("Erro ao buscar dados:", e);
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

      // Pega usuário logado
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return;

      const userId = data.user.id;

      // Upload da foto
      const response = await fetch(uri);
      const blob = await response.blob();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("perfil-secretarios")
        .upload(nomeArquivo, blob, { upsert: true });

      if (uploadError) {
        console.log("Erro ao enviar foto:", uploadError.message);
        Alert.alert("Erro", "Não foi possível enviar a foto.");
        return;
      }

      // URL pública
      const { data: urlData } = supabase.storage
        .from("perfil-secretarios")
        .getPublicUrl(nomeArquivo);

      const publicUrl = urlData.publicUrl;

      // Atualiza no banco
      const { error: updateError } = await supabase
        .from("secretario")
        .update({ fotoPerfil: publicUrl })
        .eq("id", userId);

      if (updateError) {
        console.log("Erro ao atualizar foto no banco:", updateError.message);
        return;
      }

      setFoto(publicUrl);
    } catch (e) {
      console.log("Erro ao alterar foto:", e);
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
              <UserIcon size={50} color="#9CA3AF" />
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
          value={dados?.telefone || "—"}
          icon={<PhoneIcon size={26} color="#3B82F6" />}
        />

        <InfoLinha
          label="Responsável por"
          value={dados?.responsavelPor || "—"}
          icon={<ClipboardTextIcon size={26} color="#10B981" />}
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
          value={`${dados?.atendimentosHoje || 0} atendimentos hoje`}
          icon={<ClipboardTextIcon size={26} color="#3B82F6" />}
        />

        <InfoLinha
          label="Próximos agendamentos"
          value={`${dados?.agendamentos || 0} consultas agendadas`}
          icon={<CalendarIcon size={26} color="#F97316" />}
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
