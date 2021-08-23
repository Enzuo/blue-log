import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'

import {listLog, LOG_TYPES} from '../../logic/logs'

import AddLogButton from '../presentational/AddLogButton'
import ListItemWriting from '../presentational/ListItemWriting'
import ListItemExpense from '../presentational/ListItemExpense'


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
      {logs.map(item => {
        if(item.type === 1){
          return <ListItemWriting key={item.id} item={item}></ListItemWriting>
        }
        if(item.type === 2){
          return <ListItemExpense key={item.id} item={item}></ListItemExpense>
        }
      })}
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
