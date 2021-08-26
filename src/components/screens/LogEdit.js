import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
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
    );
  }), [navigation, hasUnsavedChanges])

  async function getLog(log) {
    let log_details = await logFns.get(log)
    setEditedLog(log_details)
  }

  function initLog() {
    let log = logFns.init()
    setEditedLog(log)
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
