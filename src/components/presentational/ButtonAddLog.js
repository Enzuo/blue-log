import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'


ButtonAddLog.propTypes = {
  type : PropTypes.number,
  onPress : PropTypes.func,
}

/**
 *
 * @param {{type?:number, onPress:function}} props
 */
function ButtonAddLog ({type, onPress}) {
  const icon = 'silverware'
  const color = type === 1 ? '#00F' : null

  const [isOpen, setOpen] = useState(false)

  const types = [
    {type : 1, icon : 'fountain-pen-tip', label: 'Writing'},
    {type : 2, icon : 'cash-multiple', label: 'Expense'},
    {type : 3, icon : 'bell'},
  ]
  const defaultType = 1

  // return (
  //   <FAB
  //     style={styles.fab}
  //     icon={icon}
  //     color={color}
  //     onPress={() => { onPress(type) }}
  //     accessibilityLabel="Add log"
  //   />
  let actions = types.map(t => {
    return {
      icon : t.icon,
      label : t.label,
      onPress : () => onPress(t.type),
      small : true,
    }
  })

  return (
    <FAB.Group
      open={isOpen}
      visible={true}
      icon={isOpen ? 'calendar-today' : 'plus'}
      actions={actions}
      onStateChange={({open}) => setOpen(open)}
      onPress={() => {
        if (isOpen) {
          // do something if the speed dial is open
        }
      }}
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

export default ButtonAddLog
