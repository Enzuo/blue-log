import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'

import {listLog} from '../../logic/logs'


function Journal ({}) {
  let [logs, setLogs] = useState()

  useEffect(() => {
    async function getLog () {
      let logs = await listLog()
      setLogs(logs)
    }

    getLog()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
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

export default Journal
