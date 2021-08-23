import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'

import {listLog} from '../../logic/logs'

import AddLogButton from '../presentational/AddLogButton'


function Journal ({ navigation }) {
  let [logs, setLogs] = useState([])

  useEffect(() => {
    getLog()
  }, [])

  async function getLog () {
    let logs = await listLog()
    setLogs(logs)
  }

  return (
    <View style={styles.container}>
      <Button title="refresh" onPress={getLog}>Refresh</Button>
      {logs.map(a => <Text key={a.id}>{a.value}</Text>)}
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
