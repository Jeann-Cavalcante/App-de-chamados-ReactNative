import { HStack, Text, VStack } from "native-base";

import { Header } from "../components/Header";

export function Details() {
  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitações" />
    </VStack>
  );
}
