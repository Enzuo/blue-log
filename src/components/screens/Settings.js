import React from 'react'
import { View, StyleSheet, Text } from 'react-native'


/**
 * @param {{}} props
 */
function Settings ({}) {

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
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

export default Settings
