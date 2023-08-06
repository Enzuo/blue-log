
import database from './db'
import {migrations, queries} from '../assets/_assets'
// require('../../prisma/migrations/20210827092151_init/migration.sql')
const test = require('../../prisma/migrations/20210827092151_init/migration.sql')
console.log('require test', test)


async function init(){
  console.log('init with migrations : ', migrations)

  let name = 'prisma/test.db'
  let migrationsList = migrations.map(a => {return {name : a.name, content : a.module}})
  let queriesList = queries.map(a => {return {name : a.name, content : a.module}})

  const supports_webSQL = ("openDatabase" in window);

  console.log('openDatabase websql ?', supports_webSQL, window.openDatabase)

  await database.init(window.openDatabase, name, migrationsList, queriesList)
}

export default {
  init,
  queryFile : database.queryFile,
  querySql : database.querySql,
}
