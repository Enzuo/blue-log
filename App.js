import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import React from 'react';

import { store } from './store';
import Scan from './screens/Scan';
import Home from './screens/Home';
import Search from './screens/Search';
import SearchProduct from './screens/SearchProduct';
import ProductLogEdit from './screens/ProductLogEdit';

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Scan: { screen: Scan },
  Search: { screen: Search },
  SearchProduct: { screen: SearchProduct },
  ProductLogEdit: { screen: ProductLogEdit },
}, {
  initialRouteName: 'Home',
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
