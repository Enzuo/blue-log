import React, { useRef, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'


/**
 * @param {{navigation}} props
 */
function WritingLog ({navigation}) {
  const _inputRef = useRef(null)

  useEffect(() => {
    _inputRef.current.focus()
  }, []);

  return (
    <View style={styles.container}>
      <TextInput ref={_inputRef}></TextInput>
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
