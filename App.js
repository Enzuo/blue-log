import {createStackNavigator, createAppContainer} from 'react-navigation';
import { Provider } from 'react-redux'
import React from 'react';

import { store } from './store.js'
import Scan from './screens/Scan.js'
import Home from './screens/Home.js'
import Search from './screens/Search.js'

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Scan: {screen: Scan},
  Search: {screen: Search},
},   {
  initialRouteName: "Home"
});

const AppContainer = createAppContainer(MainNavigator);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
