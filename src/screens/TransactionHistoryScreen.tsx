import React, { useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import TransactionItem from "../components/TransactionItem";
import { fetchTransactions } from "../redux/actions/TransactionAction";
import { Transaction } from "../redux/types/TransactionTypes";
import { RootState, useAppDispatch } from "../redux/Store";
import { ShowAllContext } from "../navigation/AppNavigator";

type TransactionHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TransactionHistory"
>;

type Props = {
  navigation: TransactionHistoryScreenNavigationProp;
};

const TransactionHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { transactions, error } = useSelector(
    (state: RootState) => state.transactions
  );
  const { showAll } = useContext(ShowAllContext);
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("TransactionDetail", { transaction: item })
      }
    >
      <TransactionItem transaction={item} showAll={showAll} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={sortedTransactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTransactionItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  floatingButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    right: 30,
  },
});

export default TransactionHistoryScreen;
