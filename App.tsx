import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { NativeBaseProvider, StatusBar } from "native-base";

import { Loading } from "./src/components/Loading";
import { Home } from "./src/screens/Home";
import { Register } from "./src/screens/Register";
import { SingIn } from "./src/screens/SingnIn";
import { THEME } from "./src/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Register /> : <Loading />}
      {/*  If ternario para verificar se as fontes foram carregadas */}
    </NativeBaseProvider>
  );
}
