import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { List } from 'react-native-paper'


import ListItemWriting from '../presentational/ListItemWriting'
import ListItemExpense from '../presentational/ListItemExpense'
import { LOG_TYPES } from '../../logic/logs'



/**
 * @param {{logs:array, onPressLog:function}} props
 */
function JournalList ({logs, onPressLog}) {

  const LOG_TYPES_ITEMS = {
    1 : ListItemWriting,
    2 : ListItemExpense,
  }

  let listItems = logs.map(item => {
    // return <ListItemWriting key={item.id} item={item}></ListItemWriting>
    let itemElement = LOG_TYPES_ITEMS[item.type]({item})
    let type = LOG_TYPES.find(l => l.type === item.type)
    return (
      <List.Item
        key={item.id}
        title={item.id + item.value}
        // right={props => itemElement}
        left={props => <List.Icon {...props} icon={type.icon} />}
        onPress={() => onPressLog(item)}
      />
    )
  })

  return (
    <>
    {listItems}
    </>
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
