import { useRoute } from "@react-navigation/native";
import { HStack, Text, VStack } from "native-base";

import { Header } from "../components/Header";

type RouteParams = {
  orderId: string;
};

export function Details() {
  const route = useRoute();
  const { orderId } = route.params as RouteParams; //Recebendo o id do chamado

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitações" />
    </VStack>
  );
}
