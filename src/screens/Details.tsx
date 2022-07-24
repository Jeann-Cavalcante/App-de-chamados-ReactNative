import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import { CircleWavyCheck, Clipboard, DesktopTower, Hourglass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { Button } from "../components/Button";
import { CardDetails } from "../components/CardDetails";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { OrderProps } from "../components/Orders";
import { OrderFirestoreDTO } from "../DTOs/orderDTO";
import { dateFormat } from "../utils/firestoreDateFormat";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const navigation = useNavigation();

  const { colors } = useTheme();

  const route = useRoute();
  const { orderId } = route.params as RouteParams; //Recebendo o id do chamado

  function handleOrderClosed() {
    if (!solution) {
      return Alert.alert("Por favor, informe a solução do chamado");
    }
    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Chamado fechado com sucesso");
        navigation.goBack();
      })
      .catch(() => {
        Alert.alert("Erro ao fechar chamado");
      });
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = doc.data();
        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitações" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "closed" ? "Finalizado" : "Aberto"}
        </Text>
      </HStack>

      <ScrollView m={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Equipamentos"
          description={`Patrimonio ${order.patrimony}`}
          icon={DesktopTower}
        />

        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={Clipboard}
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Finalizado em ${order.closed}`}
        >
          {order.status === "open" && (
            <Input
              placeholder="Descrição da solução"
              onChangeText={(text) => setSolution(text)}
              h={24}
              textAlignVertical="top"
              multiline
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === "open" && (
        <Button
          onPress={handleOrderClosed}
          title="Encerrar solicitação"
          m={5}
        />
      )}
    </VStack>
  );
}
