import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Journal from './components/screens/Journal'

const Stack = createStackNavigator()


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Journal" component={Journal} />
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </PaperProvider>
  )
}
