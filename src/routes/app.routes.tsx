import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Details } from "../screens/Details";
import { Home } from "../screens/Home";
import { Register } from "../screens/Register";
import { SingIn } from "../screens/SingnIn";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Details" component={Details} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
};
