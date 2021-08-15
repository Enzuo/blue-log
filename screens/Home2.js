import React from 'react'
import PropTypes from 'prop-types'
import { View, Button, StyleSheet } from 'react-native'

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// import * as SQLite from 'expo-sqlite'
// const db = SQLite.openDatabase('dev');

import * as db from '../src/database/index'


Home2.propTypes = {

}

function Home2 ({}) {

  const handlePress = () => {

  }

  return (
    <View style={styles.container}>
      <Button onPress={handlePress} title='Add'>Add</Button>
    </View>
  )
}

/* StyleSheet
============================================================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupActionContainer: {
    backgroundColor: '#EEE',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingRight: 80,
  },
})

/* Exports
============================================================================ */

export default Home2
