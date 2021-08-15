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
  let migrationsToApply = await Promise.all(migrations.map(m => loader.loadAsset(m.module)))
  // let res = await Promise.all(migrationsToApply.map(m => loader.loadAsset(m)))
  // console.log('show asset', migrationsToApply)
  migrationsToApply.forEach(async (migration) => {
    await query()
  })

}

async function query (sql) {
  db.transaction(
    (tx) => {
      tx.executeSql(sql, [], (result) => {}, (error) => { console.error(error)})
    },
    (error) => {

    },
    (result) => {

    }
  )
}

init()

export default init
