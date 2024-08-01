import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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
  const imageSource =
    transaction.type === "credit"
      ? require("../../assets/credit_card.jpg")
      : require("../../assets/debit_card.jpg");

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>ID: {transaction.id}</Text>
        <Text>Amount: {showAll ? transaction.amount : maskedAmount}</Text>
        <Text>Date: {transaction.date}</Text>
        <Text>Description: {transaction.description}</Text>
        <Text>Payment Type: {transaction.type}</Text>
      </View>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  image: {
    height: 100,
    width: 100,
  },
});

export default TransactionDetailScreen;
