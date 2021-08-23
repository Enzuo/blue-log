import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'

import {listLog, LOG_TYPES} from '../../logic/logs'

import ButtonAddLog from '../presentational/ButtonAddLog'
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

  // TODO might just use the log edit screen
  const SCREEN_FOR_LOG_TYPES = {
    1 : 'LogWriting',
    2 : 'LogExpense',
  }

  return (
    <View style={styles.container}>
      <Button title="refresh" onPress={getLog}>Refresh</Button>
      {/* TODO Use JournalList component */}
      {logs.map(item => {
        if(item.type === 1){
          return <ListItemWriting key={item.id} item={item}></ListItemWriting>
        }
        if(item.type === 2){
          return <ListItemExpense key={item.id} item={item}></ListItemExpense>
        }
      })}
      <ButtonAddLog onPress={(type) => {
        let log = { name: 'Jane' } // TEST
        navigation.navigate(SCREEN_FOR_LOG_TYPES[type], log)
      }}></ButtonAddLog>
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
