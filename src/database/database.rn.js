import * as SQLite from 'expo-sqlite'

import database from './database'

import {migrations, queries} from '../assets/_assets'
import loader from '../assets/loader'


async function init(){

  const randomNum = new Date().getTime();
  const dbName = `${randomNum}.db`;

  let name = await loader.loadDb('../../prisma/dev.db', dbName)
  let migrations = await loadMigrations()
  let queries = await loadQueries()

  await database.init(SQLite, name, migrations, queries)
}


/**
 *
 * @returns
 */
export async function loadMigrations () {
  console.log('loading migrations')
  let loadedMigrations = await loader.loadAll(migrations)
  return loadedMigrations
}

/**
 *
 * @returns
 */
export async function loadQueries(){
  console.log('loading queries')
  let queriesAssets = await loader.loadAll(queries)
  return queriesAssets
}



export default {
  init,
  // queryFile : database.queryFile,
}
