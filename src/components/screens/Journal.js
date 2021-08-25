import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'

import {listLog, LOG_TYPES} from '../../logic/logs'

import ButtonAddLog from '../presentational/ButtonAddLog'
import ListItemWriting from '../presentational/ListItemWriting'
import ListItemExpense from '../presentational/ListItemExpense'
import JournalList from '../container/JournalList'


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

  function goToEdit (log) {
    let type = log.type
    let screenName = SCREEN_FOR_LOG_TYPES[type]
    if(screenName){
      navigation.navigate(screenName, {log})
    }
  }

  return (
    <View style={styles.container}>
      <Button title="refresh" onPress={getLog}>Refresh</Button>
      <JournalList logs={logs} onPressLog={(log) => { goToEdit(log) }}></JournalList>
      <ButtonAddLog types={LOG_TYPES} onPress={(type) => {
        let log = { name: 'Jane' } // TEST
        let screenName = SCREEN_FOR_LOG_TYPES[type]
        if(screenName){
          navigation.navigate(screenName, {log})
        }
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
