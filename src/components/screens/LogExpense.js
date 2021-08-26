import React, {useRef, useEffect} from 'react'
import { View, StyleSheet, TextInput } from 'react-native'


/**
 * @param {{log, onChange, onSubmit}} props
 */
function ExpenseLog ({log, onChange, onSubmit}) {

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus={true}
        value={log.amount ? log.amount+'' : ''}
        keyboardType="numeric"
        onChangeText={(text) => {
          let amount = parseInt(text)
          onChange({...log, amount})
        }}
        onSubmitEditing={onSubmit}
      ></TextInput>
      <TextInput
        value={log.comment}
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

export default ExpenseLog
