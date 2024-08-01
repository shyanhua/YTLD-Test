import React, { useEffect, useContext, useState } from "react";
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
import LottieView from "lottie-react-native";

type TransactionHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TransactionHistory"
>;

type Props = {
  navigation: TransactionHistoryScreenNavigationProp;
};

const TransactionHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { transactions, error } = useSelector(
    (state: RootState) => state.transactions
  );
  const { showAll } = useContext(ShowAllContext);
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    setLoading(true);
    await dispatch(fetchTransactions());
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchTransactions());
    setRefreshing(false);
  };

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
      {loading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("../../assets/loading.json")}
            autoPlay
            loop
            style={styles.loading}
          />
        </View>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={sortedTransactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTransactionItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    width: 200,
    height: 200,
  },
});

export default TransactionHistoryScreen;
