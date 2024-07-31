import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList, ShowAllContext } from "../navigation/AppNavigator";

type TransactionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "TransactionDetail"
>;

type Props = {
  route: TransactionDetailScreenRouteProp;
};

const TransactionDetailScreen: React.FC<Props> = ({ route }) => {
  const { transaction } = route.params;
  const { showAll } = useContext(ShowAllContext);
  const maskedAmount = "****";

  return (
    <View style={styles.container}>
      <Text>ID: {transaction.id}</Text>
      <Text>Amount: {showAll ? transaction.amount : maskedAmount}</Text>
      <Text>Date: {transaction.date}</Text>
      <Text>Description: {transaction.description}</Text>
      <Text>Payment Type: {transaction.type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default TransactionDetailScreen;
