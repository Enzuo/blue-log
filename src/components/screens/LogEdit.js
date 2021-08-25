import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { getWritingLog, createOrUpdateWritingLog } from '../../logic/logs'
import LogWriting from './LogWriting'


/**
 * @param {{route, navigation}} props
 */
function LogEdit ({route, navigation}) {
  const { log } = route.params

  let [editedLog, setEditedLog] = useState(log)
  let [hasUnsavedChanges, setUnsavedChange] = useState(false)

  useEffect(() => {
    if(log.id){
      getLog(log)
    }
    else {
      initLog()
    }
  }, [log.id])

  useEffect(
    () =>
      // return navigation listener unsuscribe, it will remove listener when useEffect get destructed
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            { text: "Don't leave", style: 'cancel', onPress: () => {} },
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges]
  );

  async function getLog(log) {
    let log_details = await getWritingLog(log)
    setEditedLog(log_details)
  }

  function initLog() {
    let date = log.date || Date.now()
    setEditedLog({date})
  }

  const handleChange = (log) => {
    setUnsavedChange(true)
    setEditedLog(log)
  }

  const handleSubmit = () => {
    createOrUpdateWritingLog(editedLog)
    setUnsavedChange(false)

    // give it time for state to change
    setTimeout(()=>{
      navigation.navigate('Journal')
    })
  }

  return (
    <LogWriting log={editedLog} onChange={handleChange} onSubmit={handleSubmit}></LogWriting>
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
