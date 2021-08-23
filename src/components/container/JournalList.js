import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'

import ListItemWriting from '../presentational/ListItemWriting'
import ListItemExpense from '../presentational/ListItemExpense'



/**
 * @param {{logs:array, onPressLog:function}} props
 */
function JournalList ({logs, onPressLog}) {

  const LOG_TYPES_ITEMS = {
    1 : ListItemWriting,
    2 : ListItemExpense,
  }

  let listItems = logs.map(item => {
    return LOG_TYPES_ITEMS[item.type]({item})
  }).map(item => {
    return <Pressable key={item.id} onPress={() => onPressLog(item.id)}>{item}</Pressable>
  })

  return (
    {listItems}
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

export default JournalList
