import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";

import { SingIn } from "../screens/SingnIn";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User>(null);
  return (
    <NavigationContainer>
      <SingIn />
    </NavigationContainer>
  );
}
