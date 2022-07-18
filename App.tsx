import { NativeBaseProvider } from "native-base";
import { SingIn } from "./src/screens/SingnIn";

export default function App() {
  return (
    <NativeBaseProvider>
      <SingIn />
    </NativeBaseProvider>
  );
}
