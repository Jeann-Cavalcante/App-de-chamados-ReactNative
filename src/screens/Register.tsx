import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Text, VStack } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  function handleNewOrder() {
    if (patrimony.length === 0 || !description) {
      return alert("Preencha todos os campos");
    }

    setIsLoading(true);

    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setIsLoading(false);
        Alert.alert("Sucesso", "Pedido cadastrado com sucesso");
        navigation.goBack();
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert("Erro", "Não foi possível cadastrar o pedido");
      });
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input
        placeholder="Descrição do problema"
        mt={5}
        multiline
        textAlignVertical="top"
        flex={1}
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrder}
      />
    </VStack>
  );
}
