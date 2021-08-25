import React, { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import {listLog, LOG_TYPES} from '../../logic/logs'

import ButtonAddLog from '../presentational/ButtonAddLog'
import JournalList from '../container/JournalList'


function Journal ({ navigation }) {
  let [logs, setLogs] = useState([])


  useFocusEffect(
    useCallback(() => {
      let getLogs = async () => {
        let logs = await listLog()
        setLogs(logs)
      }
      getLogs()
    }, [])
  )

  function goToEdit (log) {
    navigation.navigate('LogEdit', {log})
  }

  return (
    <View style={styles.container}>
      <JournalList logs={logs} onPressLog={(log) => { goToEdit(log) }}></JournalList>
      <ButtonAddLog types={LOG_TYPES} onPress={(type) => {
        let log = { type }
        goToEdit(log)
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
