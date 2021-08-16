import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import * as SQLite from 'expo-sqlite'

import loader from '../assets/loader'
import * as utils from './utils'

import {loadMigrations} from './migrations'
import {loadQueries} from './queries'


let db
let queries

async function init (){
  const randomNum = new Date().getTime();
  const dbName = `${randomNum}.db`;
  let name = await loader.loadDb('../../prisma/dev.db', dbName)
  db = SQLite.openDatabase(name)

  await migrate()

  queries = await loadQueries()
}

async function migrate () {
  // define current version
  // pick needed migrations
  let result = await querySql('SELECT "migration_name" FROM "_prisma_migrations"')
  let executedMigrationsNames = sqliteResult(result).map(a => a.migration_name)

  // load migrations assets
  let migrationsToApply = await loadMigrations(executedMigrationsNames)

  // execute migrations
  migrationsToApply.forEach(async (migration) => {
    console.log('>>> applying migration', migration.name)
    await querySql(migration.content)

    // Simulate prisma migration log
    await querySql(
      'INSERT INTO "_prisma_migrations" ("id", "checksum", "migration_name") VALUES (?, ?, ?)',
      [uuidv4(), 'local', migration.name]
    )
  })
}

/**
 * Main database query function,
 * create transaction and execute an array of statements
 *
 * @param {{sql: string, values: array}[]} statements
 * @returns
 */
async function query (statements) {
  return new Promise((resolve, reject) => {
    let results = []
    db.transaction(
      (tx) => {
        statements.forEach((stt) => {
          tx.executeSql(
            stt.sql,
            stt.values,
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

async function querySql (sql, data=[]) {
  let statementsSql = utils.splitStatements(sql)
  let statements = statementsSql.map(stt => { return {sql:stt, values: data}})
  let result = await query(statements)
  return result
}

async function queryFns (queriesFn, data) {
  let statements = queriesFn.map(queryFn => queryFn(data))
  let result = await query(statements)
  return result
}

/**
 *
 * @param {string} filepath
 * @param {object} data
 * @returns
 */
async function queryFile(filepath, data){
  let query = queries.find(q => q.name === filepath)
  if(!query){
    throw  Error('query not found ' + filepath)
  }
  let result = await queryFns(query.sttFns, data)
  return result
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

export default {queryFile}
