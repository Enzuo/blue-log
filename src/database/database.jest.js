import openDatabase from 'websql'


import database from './db'

import {migrations, queries} from '../assets/_assets'


async function init(){

  let name = 'prisma/test.db'
  let migrationsList = migrations.map(a => {return {name : a.name, content : a.module}})
  let queriesList = queries.map(a => {return {name : a.name, content : a.module}})

  await database.init(openDatabase, name, migrationsList, queriesList)
}

export default {
  init,
  queryFile : database.queryFile,
  querySql : database.querySql,
}
