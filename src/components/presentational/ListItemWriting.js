import React from 'react'
import { View, StyleSheet, Text } from 'react-native'


/**
 * @param {{item:object}} props
 */
function ListItemWritingLog ({item}) {

  return (
    <Text style={styles.container}>{item.value}</Text>
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

export default ListItemWritingLog
