import { Provider } from 'react-redux'
import { createStore } from 'redux'
import * as React from "react";
import ReducerStore from './src/reduxFile/store'
import Navigator from './src/app/Navigator'
import store from './src/reduxFile/store/store'
import AppStart from './src/app/AppStart'

export default function App() {
  return (
    <Provider store={store}>
        <AppStart />
    </Provider>
  );
}
