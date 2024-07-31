import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Transaction } from "../redux/types/TransactionTypes";

interface TransactionItemProps {
  transaction: Transaction;
  showAll: boolean;
}

const TransactionItem: React.FC<TransactionItemProps> = React.memo(
  ({ transaction, showAll }) => {
    const maskedAmount = "****";

    return (
      <View style={styles.container}>
        <Text>Date : {transaction.date}</Text>
        <Text>Amount : {showAll ? transaction.amount : maskedAmount}</Text>
        <Text>Description : {transaction.description}</Text>
        <Text>Payment Type : {transaction.type}</Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default TransactionItem;
