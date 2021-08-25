import moduleon from 'sql-moduleon'


// import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
// import * as SQLite from 'expo-sqlite'

// import loader from '../assets/loader'
import * as utils from './utils'

// import {loadMigrations} from './migrations'
// import {loadQueries} from './queries'


let db
let queries

/**
 *
 * @param {{openDatabase:any}} SQLite websql driver
 * @param {string} name database name
 * @param {{name:string, content:string}[]} migrations list of database migrations
 * @param {{name:string, content:string}[]} queriesList list of queries
 */
async function init (SQLite, name, migrations, queriesList){
  console.log('>>> db:init')
  db = SQLite.openDatabase(name, '1.0', 'description', 1)

  await migrate(migrations)

  // Prepare query functions
  queries = queriesList.map(q => {
    let statements = utils.splitStatements(q.content)
    let sttFns = statements.map(stt => moduleon(stt))
    return {name : q.name, content : q.content, sttFns}
  })
}

async function migrate (migrations) {
  // define current version
  // pick needed migrations
  let result = await querySql('SELECT "migration_name" FROM "_prisma_migrations"')
  let executedMigrationsNames = sqliteResult(result).map(a => a.migration_name)
  let migrationsToApply = migrations.filter(m => executedMigrationsNames.findIndex(name => name === m.name) === -1)

  // execute migrations
  let migrationsToApplyQueue = migrationsToApply.map((migration) => {
    return async () => {
      console.log('>>> db:applying migration', migration.name)
      await querySql(migration.content)

      // Simulate prisma migration log
      // TODO might be interesting to have it in the same transaction as the migration,
      //      so if this fails the whole migration gets a rollback
      await querySql(
        'INSERT INTO "_prisma_migrations" ("id", "checksum", "migration_name") VALUES (?, ?, ?)',
        [uuidv4(), 'local', migration.name]
        )
      console.log('>>> db:migration applied', migration.name)
    }
  })
  for(let i=0; i < migrationsToApplyQueue.length; i++){
    await migrationsToApplyQueue[i]()
  }
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
            (tx, result) => {
              results.push(result)
            },
            (tx, error) => {
              return true // rollback tx & call tx error callback
            }
          )
        })
      },
      (txError) => {
        reject(txError)
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
 * @param {string} name
 * @param {object} data
 * @returns
 */
async function queryFile(name, data){
  console.log('executing query', name)
  let query = queries.find(q => q.name === name)
  if(!query){
    throw  Error('query not found ' + name)
  }
  let result = await queryFns(query.sttFns, data)
  // console.log(result)
  return sqliteResult(result)
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

export default {init, queryFile}
