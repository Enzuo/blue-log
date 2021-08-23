import React, { useRef, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'

import {createWritingLog} from '../../logic/logs'


/**
 * @param {{navigation}} props
 */
function WritingLog ({navigation}) {
  const _inputRef = useRef(null)

  let [isUpdated, setUpdated] = useState(false)
  let [comment, setComment] = useState('')

  useEffect(() => {
    _inputRef.current.focus()
  }, []);

  function onEditSubmit() {
    console.log('submit', comment)
    createWritingLog({
      date: Date.now(),
      comment,
    })
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
