import React, { useRef, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native'

import {createOrUpdateWritingLog, getWritingLog} from '../../logic/logs'


/**
 * @param {{log, onChange, onSubmit}} props
 */
function WritingLog ({log, onChange, onSubmit}) {
  const _inputRef = useRef(null)

  useEffect(() => {
    _inputRef.current.focus()
  }, []);

  return (
    <View style={styles.container}>
      <TextInput ref={_inputRef} value={log.comment}
        onChangeText={(comment) => {
          onChange({...log, comment})
        }}
        onSubmitEditing={onSubmit}
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
