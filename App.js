import { Provider } from 'react-redux'
import { createStore } from 'redux'
import * as React from "react";
import {StyleSheet, Text, View } from "react-native";
import { createAppContainer } from 'react-navigation';
import ReducerStore from './src/reduxFile/store'
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/app/home'

const AppNavigator = createStackNavigator(
  {
    Home: Home,
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);
let store = createStore(ReducerStore);

export default function App() {
  return (
    <Provider store={store}>
        <AppContainer />
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    alignItems: "center",
  },
  name: {
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
