import React from 'react'
import { IconButton } from 'react-native-paper'


/**
 * @param {{onPressSettings:Function}} props
 */
function MainMenu ({onPressSettings}) {

  return (
    <>
      <IconButton
        icon="cog"
        onPress={() => {
          onPressSettings()
        }}
      />
    </>
  )
}

/* StyleSheet
============================================================================ */


/* Exports
============================================================================ */

export default MainMenu
