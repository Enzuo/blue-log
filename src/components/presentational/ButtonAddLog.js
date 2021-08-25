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
 * @param {{
 *  defaultType?:number,
 *  onPress:(type:number) => void,
 *  types:{icon:string, label:string, type:number}[]
 * }} props
 */
function ButtonAddLog ({defaultType, onPress, types}) {
  const [isOpen, setOpen] = useState(false)

  let actions = types.map(t => {
    return {
      icon : t.icon,
      label : t.label,
      onPress : () => onPress(t.type),
      small : true,
    }
  })

  console.log('actions >>>>>', actions)

  return (
    <FAB.Group
      open={isOpen}
      visible={true}
      icon={isOpen ? '' : 'plus'}
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
