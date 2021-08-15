// import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import { Provider } from 'react-redux';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { store } from './redux/store';
import database from './database';
import Home2 from './screens/Home2';
import SearchProduct from './screens/SearchProduct';
import ProductLogEdit from './screens/ProductLogEdit';
import RecipeLogEdit from './screens/RecipeLogEdit';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home2} />
      <Stack.Screen name="SearchProduct" component={SearchProduct} />
      <Stack.Screen name="ProductLogEdit" component={ProductLogEdit} />
      <Stack.Screen name="RecipeLogEdit" component={RecipeLogEdit} />
    </Stack.Navigator>
  );
}

database.init();


// const AppContainer = createAppContainer();

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
