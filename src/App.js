import React, { PureComponent } from 'react';
import { Provider, DarkTheme } from 'react-native-paper';
import { StatusBar } from 'react-native';
import Home from './screens/Home';

export default class App extends PureComponent {
  render() {
    return (
      <Provider theme={DarkTheme}>
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
        <Home />
      </Provider>
    );
  }
}
