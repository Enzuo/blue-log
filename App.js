import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import React from 'react';

import { store } from './store';
import Home from './screens/Home';
import SearchProduct from './screens/SearchProduct';
import ProductLogEdit from './screens/ProductLogEdit';

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
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
