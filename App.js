import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { store } from './store';
import database from './database';
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

database.init().then(() => {
  database.query('listLog');
});

const AppContainer = createAppContainer(MainNavigator);

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    </Provider>
  );
}
