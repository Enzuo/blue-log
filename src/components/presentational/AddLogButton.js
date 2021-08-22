import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'


AddLogButton.propTypes = {
  type : PropTypes.number,
  onPress : PropTypes.func,
}

/**
 *
 * @param {{type?:number, onPress:function}} props
 */
function AddLogButton ({type, onPress}) {
  const icon = 'silverware'
  const color = type === 1 ? '#00F' : null

  return (
    <FAB
      style={styles.fab}
      icon={icon}
      color={color}
      onPress={() => { onPress(type) }}
      accessibilityLabel="Add log"
    />
  )
}

/* StyleSheet
============================================================================ */

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

/* Exports
============================================================================ */

export default AddLogButton
