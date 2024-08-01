import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { RootStackParamList } from "../navigation/AuthNavigator";
import { login } from "../redux/actions/AuthAction";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootState, useAppDispatch } from "../redux/Store";
import LottieView from "lottie-react-native";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const dispatch = useAppDispatch();
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleLogin = () => {
    if (!username || !password) {
      setValidationError("Username and password are required.");
      return;
    }
    setValidationError("");

    setLoading(true);
    dispatch(login(username, password)).finally(() => {
      setLoading(false);
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("../../assets/loading.json")}
            autoPlay
            loop
            style={styles.loading}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LottieView
            source={require("../../assets/logo.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          {validationError ? (
            <Text style={styles.error}>{validationError}</Text>
          ) : authError ? (
            <Text style={styles.error}>{authError}</Text>
          ) : null}
          <Button title="Login" onPress={handleLogin} />
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
  lottie: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
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

export default LoginScreen;
