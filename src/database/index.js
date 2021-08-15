import {migrations} from '../assets/_assets'
import loader from '../assets/loader'
import * as SQLite from 'expo-sqlite'


let db

async function init (){
  db = SQLite.openDatabase('my_db')
  await migrate()
  // let migration0 = await loader.loadAsset(migrations[0])
  // console.log('show asset', migration0)
}

async function migrate () {
  // define current version
  // needed migrations

  //
  // let migrationsToApply = await Promise.all(migrations.map(m => loader.loadAsset(m.module)))
  let migrationsToApply = await loader.loadAll(migrations)
  // let res = await Promise.all(migrationsToApply.map(m => loader.loadAsset(m)))
  console.log('show asset', migrationsToApply)
  migrationsToApply.forEach(async (migration) => {
    await query(migration.content)
    await query('INSERT INTO "_prisma_migrations" ("migration_name") VALUES (?)', [migration.name])
  })
}

async function query (sql, data=[]) {
  db.transaction(
    (tx) => {
      tx.executeSql(sql, data, (tx, result) => {}, (tx, error) => { console.error(error)})
    },
    (error) => {
      console.error(error)
    },
    (result) => {

    }
  )
}

init()

export default init
