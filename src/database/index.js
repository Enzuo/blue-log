import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

import * as SQLite from 'expo-sqlite'

import {migrations} from '../assets/_assets'
import loader from '../assets/loader'


let db

async function init (){
  const randomNum = new Date().getTime();
  const dbName = `${randomNum}.db`;
  let name = await loader.loadDb('../../prisma/dev.db', dbName)
  db = SQLite.openDatabase(name)
  await migrate()
  // let migration0 = await loader.loadAsset(migrations[0])
  // console.log('show asset', migration0)
}

async function migrate () {
  // define current version
  // pick needed migrations
  let result = await query('SELECT "migration_name" FROM "_prisma_migrations"; SELECT * FROM "_prisma_migrations";')
  console.log('result', result)
  let executedMigrationsNames = sqliteResult(result).map(a => a.migration_name)
  let migrationsFiltered = migrations.filter(m => executedMigrationsNames.findIndex(name => name === m.name) === -1)

  // load migrations assets
  let migrationsToApply = await loader.loadAll(migrationsFiltered)

  // execute migrations
  migrationsToApply.forEach(async (migration) => {
    console.log('>>> applying migration', migration.name)
    await query(migration.content)

    // Simulate prisma migration log
    await query(
      'INSERT INTO "_prisma_migrations" ("id", "checksum", "migration_name") VALUES (?, ?, ?)',
      [uuidv4(), 'local', migration.name]
    )
  })
}

async function query (sql, data=[]) {
  return new Promise((resolve, reject) => {
    let results = []
    db.transaction(
      (tx) => {
        let statements = splitStatements(sql)
        statements.forEach((stt) => {
          tx.executeSql(
            stt,
            data,
            (tx, result) => { results.push(result)},
            (tx, error) => { console.error(error)}
          )
        })
      },
      (error) => {
        console.error(error)
        reject(error)
      },
      () => {
        resolve(results)
      }
    )
  })
}

function splitStatements(sql){
  const rawStatements = sql.split(/;(?!--p:o)/); // dumb split on ; add --;o to ommit them
  const statements = rawStatements.filter(stt => stt.trim() !== '');
  return statements
}

/**
 *
 * @param {*} result Array [
                      WebSQLResultSet {
                        "insertId": undefined,
                        "rows": WebSQLRows {
                          "_array": Array [
                            Object {
                              "migration_name": "20210815100322_init",
                            },
 * @returns
 */
function sqliteResult(result){
  return result[0].rows._array
}

init()

export default {}
