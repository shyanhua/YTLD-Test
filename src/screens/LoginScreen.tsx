import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootStackParamList } from "../navigation/AuthNavigator";
import { login } from "../redux/actions/AuthAction";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootState, useAppDispatch } from "../redux/Store";

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
  const dispatch = useAppDispatch();
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleLogin = () => {
    dispatch(login(username, password));
  };

  return (
    <View style={styles.container}>
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
      {authError && <Text style={styles.error}>{authError}</Text>}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
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
});

export default LoginScreen;
