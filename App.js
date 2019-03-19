import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { store } from './store';
import database from './database';
import testDatabase from './utils/testDatabase';
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

database.init().then( async () => {
  await database.query('listLog');
  let res = await database.query('test1');
  console.log('result test1', res)
  res = await database.query('test2');
  console.log('result test2', res)
  testDatabase.scenario1();
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
