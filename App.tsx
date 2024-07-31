import React from "react";
import { Provider, useSelector } from "react-redux";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { RootState, store } from "./src/redux/Store";

const MainNavigator: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? <AppNavigator /> : <AuthNavigator />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
