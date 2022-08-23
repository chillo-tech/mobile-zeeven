import React, { useContext } from "react";
import ScanStack from "./ScanStack";
import AuthStack from "./AuthStack";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationContext } from "../context/ApplicationContextProvider";

const Stack = createNativeStackNavigator();

function RootStack() {
  const { state } = useContext(ApplicationContext);

  return (
    <Stack.Navigator>
      {!state.userToken ? (
        <Stack.Screen
          name="Auth Screen"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Scan Screen"
          component={ScanStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
