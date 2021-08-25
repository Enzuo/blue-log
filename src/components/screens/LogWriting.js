import React, { useRef, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'

import {createWritingLog, getWritingLog, updateWritingLog} from '../../logic/logs'


/**
 * @param {{route, navigation}} props
 */
function WritingLog ({route, navigation}) {
  const _inputRef = useRef(null)

  const { log } = route.params

  console.log('route param', log)


  let [isUpdated, setUpdated] = useState(false)
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

  async function getLog(log) {
    let log_details = await getWritingLog(log)
    setComment(log_details.comment)
  }

  function initLog() {
    setComment('')
  }

  function onEditSubmit() {
    console.log('submit', comment)
    if(log.id){
      updateWritingLog({
        ...log, comment
      })
    }
    else {
      createWritingLog({
        date: Date.now(),
        comment,
      })
    }
    navigation.navigate('Journal')
  }

  return (
    <View style={styles.container}>
      <TextInput ref={_inputRef} value={comment}
        onChangeText={(text) => {
          setUpdated(true)
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
