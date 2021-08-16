import moduleon from 'sql-moduleon'

import {queries} from '../assets/_assets'
import loader from '../assets/loader'

import * as utils from './utils'


/**
 *
 * @returns
 */
export async function loadQueries(){
  console.log('load queries')
  let queriesAssets = await loader.loadAll(queries)
  return queriesAssets.map(q => {
    let statements = utils.splitStatements(q.content)
    let statementsFns = statements.map(stt => {
      return moduleon(stt)
    })
    return {name : q.name, content : q.content, sttFns : statementsFns}
  })
}
