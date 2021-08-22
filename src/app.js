import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import db from './database/database.rn'

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
  const [isLoaded, setLoaded] = useState(false)
  useEffect(() => {
    async function init() {
      await db.init()
      setLoaded(true)
    }
    init()
  }, [])

  if(!isLoaded){
    return <View><Text>Loading...</Text></View>
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </PaperProvider>
  )
}
