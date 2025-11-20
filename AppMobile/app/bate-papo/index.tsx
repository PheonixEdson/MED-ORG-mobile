import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

type Mensagem = {
  from: string;
  text: string;
};

export default function ChatScreen() {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<Mensagem>>(null);

  const [messages, setMessages] = useState([
    {
      from: "system",
      text: "Bom dia Robsom. Como você está se sentindo hoje?",
    },
    { from: "user", text: "Olá Dr. Henrique estou um pouco melhor" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    setMessages([...messages, { from: "user", text: newMessage }]);
    setNewMessage("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Dr. Henrique Dias Gonçalves</Text>
        <Text style={styles.headerTime}>{time}</Text>
      </View>

      {/* LISTA DE MENSAGENS */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ padding: 10 }}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        renderItem={({ item }) => (
          <View
            style={
              item.from === "system"
                ? styles.systemMessage
                : styles.userMessage
            }
          >
            <Text
              style={
                item.from === "system"
                  ? styles.systemText
                  : styles.userText
              }
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* INPUT */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={handleSend}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e40af",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },

  headerTime: {
    color: "#FFF",
    fontSize: 16,
  },

  systemMessage: {
    backgroundColor: "#a5c8f5ff",
    padding: 10,
    marginVertical: 6,
    marginRight: "40%",
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  userMessage: {
    backgroundColor: "#1976D2",
    padding: 10,
    marginVertical: 6,
    marginLeft: "40%",
    borderRadius: 8,
    alignSelf: "flex-end",
  },

  systemText: {
    color: "#333",
    fontSize: 15,
  },

  userText: {
    color: "#FFF",
    fontSize: 15,
  },

  inputContainer: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#ddd",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    fontSize: 16,
  },

  sendButton: {
    backgroundColor: "#1e40af",
    padding: 12,
    borderRadius: 8,
  },
});
