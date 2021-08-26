import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import db from './database/database.rn'

import Journal from './components/screens/Journal'
import LogEdit from './components/screens/LogEdit'
import Settings from './components/screens/Settings'

import MainMenu from './components/container/MainMenu'

const Stack = createStackNavigator()


function NavigationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Journal"
        component={Journal}
        options={({ navigation }) => ({
          // headerTitle: props => <LogoTitle {...props} />,
          headerRight: () => MainMenu({
            onPressSettings : () => {
              navigation.navigate('Settings')
            }
          })
        })}
      />
      <Stack.Screen name="LogEdit" component={LogEdit} />
      <Stack.Screen name="Settings" component={Settings} />
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
        <NavigationStack />
      </NavigationContainer>
    </PaperProvider>
  )
}
