import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, StyleSheet, Alert, Button } from 'react-native'
import { IconButton } from 'react-native-paper'
import logs  from '../../logic/logs'
import LogWriting from './LogWriting'
import LogExpense from './LogExpense'


const LOG_TYPES_FUNCTIONS = {
  1 : { Component : LogWriting, ...logs.writing},
  2 : { Component : LogExpense, ...logs.expense},
}


/**
 * Log details & edit screen
 * - handle retrieving of log details and save
 *
 * @param {{route, navigation}} props
 */
function LogEdit ({route, navigation}) {
  const { log } = route.params

  let [editedLog, setEditedLog] = useState(log)
  let [hasUnsavedChanges, setUnsavedChange] = useState(false)

  let logFns = LOG_TYPES_FUNCTIONS[log.type]

  useEffect(() => {
    if(log.id){
      getLog(log)
    }
    else {
      initLog()
    }
  }, [log.id])

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    if (!hasUnsavedChanges) {
      return
    }
    e.preventDefault()
    Alert.alert(
      'Discard changes?',
      'You have unsaved changes. Are you sure to discard them and leave the screen?',
      [
        { text: "Don't leave", style: 'cancel', onPress: () => {} },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]
    )
  }), [navigation, hasUnsavedChanges])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => HeadbarButtons({navigation, log, onRemove : handleRemove})
    });
  }, [navigation, log.id]);

  async function getLog(log) {
    let log_details = await logFns.get(log)
    setEditedLog(log_details)
  }

  function initLog() {
    let log = logFns.init()
    setEditedLog(log)
  }

  const handleRemove = () => {
    logFns.remove(log)
    setUnsavedChange(false)

    // give it time for state to change
    setTimeout(()=>{
      navigation.navigate('Journal')
    })
  }

  const handleChange = (log) => {
    setUnsavedChange(true)
    setEditedLog(log)
  }

  const handleSubmit = () => {
    logFns.createOrUpdate(editedLog)
    setUnsavedChange(false)

    // give it time for state to change
    setTimeout(()=>{
      navigation.navigate('Journal')
    })
  }

  return (
    <logFns.Component log={editedLog} onChange={handleChange} onSubmit={handleSubmit}></logFns.Component>
  )
}

function HeadbarButtons ({navigation, log, onRemove}) {
  if(!log.id){
    return null
  }
  return (
    <IconButton
      icon="trash-can"
      onPress={() => {
        Alert.alert(
          'Delete this log?',
          '',
          [
            { text: "Cancel", style: 'cancel', onPress: () => {} },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => onRemove(),
            },
          ]
        )
      }}
    />
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

export default LogEdit
