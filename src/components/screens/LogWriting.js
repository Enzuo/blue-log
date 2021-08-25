import React, { useRef, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native'

import {createOrUpdateWritingLog, getWritingLog} from '../../logic/logs'


/**
 * @param {{route, navigation}} props
 */
function WritingLog ({route, navigation}) {
  const _inputRef = useRef(null)

  const { log } = route.params

  let [hasUnsavedChanges, setUnsavedChange] = useState(false)
  let [comment, setComment] = useState('')


  useEffect(() => {
    if(log.id){
      getLog(log)
    }
    else {
      initLog()
    }
  }, [log.id])

  useEffect(() => {
    _inputRef.current.focus()
  }, []);

  useEffect(
    () =>
      // return navigation listener unsuscribe, it will remove listener when useEffect get destructed
      navigation.addListener('beforeRemove', (e) => {
        console.log('before remove listener', hasUnsavedChanges)
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
    setComment(log_details.comment)
  }

  function initLog() {
    setComment('')
  }

  function onEditSubmit() {
    console.log('submit', comment)
    let date = log.date || Date.now()
    // console.log('date', date)
    createOrUpdateWritingLog({
      ...log,
      date,
      comment
    })
    setUnsavedChange(false)
    navigation.navigate('Journal')
  }

  return (
    <View style={styles.container}>
      <TextInput ref={_inputRef} value={comment}
        onChangeText={(text) => {
          setUnsavedChange(true)
          setComment(text)
        }}
        onSubmitEditing={onEditSubmit}
      ></TextInput>
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

export default WritingLog
