import auth from "@react-native-firebase/auth";
import { Heading, Icon, useTheme, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import { Alert } from "react-native";

import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SingIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleName() {
    if (!email || !password) {
      Alert.alert("Error", "Login invalido");
      return;
    }
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Login realizado com sucesso");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Error", "Email inválido.");
        }

        if (error.code === "auth/wrong-password") {
          return Alert.alert("Error", "Email ou senha inválido.");
        }

        if (error.code === "auth/user-not-found") {
          return Alert.alert("Error", "Email ou senha inválido.");
        }

        return Alert.alert("Error", "Erro ao fazer login.");
      });
  }

  const { colors } = useTheme(); //hook para usar thema
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Senha"
        type="password"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        mt={6}
        w="100%"
        onPress={handleName}
        isLoading={isLoading}
      />
    </VStack>
  );
}
