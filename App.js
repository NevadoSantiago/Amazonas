import { Provider } from 'react-redux'
import { createStore } from 'redux'
import * as React from "react";
import ReducerStore from './src/reduxFile/store'
import Navigation from './src/app/Navigator'
import store from './src/reduxFile/store/store'

export default function App() {
  return (
    <Provider store={store}>
        <Navigation />
    </Provider>
  );
}
