import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import {listLog} from '../../logic/logs'

import AddLogButton from '../presentational/AddLogButton'


function Journal ({ navigation }) {
  let [logs, setLogs] = useState()

  useEffect(() => {
    async function getLog () {
      let logs = await listLog()
      setLogs(logs)
    }

    getLog()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
      <AddLogButton onPress={() => {
        navigation.navigate('WritingLog', { name: 'Jane' })
      }}></AddLogButton>
    </View>
  )
}

/* StyleSheet
============================================================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

/* Exports
============================================================================ */

export default Journal
