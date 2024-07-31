import React, { useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionHistoryScreen from "../screens/TransactionHistoryScreen";
import TransactionDetailScreen from "../screens/TransactionDetailScreen";
import { Transaction } from "../redux/types/TransactionTypes";
import { Alert, Button, View } from "react-native";
import { authenticateBiometric } from "../utils/Biometrics";

export type RootStackParamList = {
  TransactionHistory: undefined;
  TransactionDetail: { transaction: Transaction };
};

const Stack = createStackNavigator<RootStackParamList>();

export const ShowAllContext = createContext({
  showAll: false,
  setShowAll: (show: boolean) => {},
});

const AppNavigator: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = async () => {
    if (!showAll) {
      try {
        const isAuthenticated = await authenticateBiometric();
        if (isAuthenticated) {
          setShowAll(true);
        } else {
          Alert.alert(
            "Authentication Failed",
            "Biometric authentication failed"
          );
        }
      } catch (error: any) {
        Alert.alert("Authentication Error", error.message);
      }
    } else {
      setShowAll(false);
    }
  };

  return (
    <ShowAllContext.Provider value={{ showAll, setShowAll }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TransactionHistory">
          <Stack.Screen
            name="TransactionHistory"
            component={TransactionHistoryScreen}
            options={{
              headerRight: () => (
                <View style={{ paddingRight: 10 }}>
                  <Button
                    onPress={handleShowAll}
                    title={showAll ? "Hide All" : "Show All"}
                    color="#000"
                  />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="TransactionDetail"
            component={TransactionDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ShowAllContext.Provider>
  );
};

export default AppNavigator;
