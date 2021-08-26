import * as storage from './storage'

export const LOG_TYPES = [
  {type : 1, name : 'writing', icon : 'fountain-pen-tip', label : 'Writing'},
  {type : 2, name : 'expense', icon : 'cash-multiple'   , label : 'Expense'},
  {type : 3, name : 'movie'  , icon : 'movie'           , label : 'Movie'},
  {type : 4, name : 'book'   , icon : 'book'            , label : 'Book'},
  {type : 5, name : 'photo'  , icon : 'camera'          , label : 'Photo'},
]

/**
 *
 * @returns {Promise<[{
 *             id: number,
 *             type: number,
 *             date: number,
 *             value: string|number
 *          }]>}
 */
export async function listLog(){
  let result = await storage.call('log/list.sql')
  return result
}

/****
 *
 * WRITING
 *
 */

/****
 *
 * EXPENSES
 *
 */
export function initExpenseLog(){
  return {
    date : Date.now(),
    amount : null,
    comment : '',
    idCategory : 1,
    idCurrency : 1,
  }
}

/**************************************
 *
 *               UTILS
 *
 *************************************/

/**
 *
 * @param {string} apiName
 * @param {{id?:number, date:number}} log
 * @returns
 */
 async function createOrUpdate(apiName, log){
  let date = transformDate(log.date)
  if(log.id){
    let payload = {...log, date}
    return storage.call(apiName+'/update.sql', payload)
  }
  let type = LOG_TYPES.find(l => l.name === apiName).type
  let payload = {...log, date, type}
  return storage.call(apiName+'/create.sql', payload)
}

/**
 *
 * @param {string} apiName
 * @param {{id:number}} log
 * @returns {Promise<{id:number, type:number, date:number, amount:number}>}
 */
async function get(apiName, log){
  let payload = {id: log.id}
  let result = await storage.call(apiName+'/get.sql', payload)
  return result[0]
}



function transformDate(date){
  if(typeof date === 'string'){
    let parsedDate = date.replace(' ', 'T') // old version of javascript have this strict date format
    return new Date(parsedDate).toISOString()
  }
  return new Date(date).toISOString()
}

export default {
  writing : {
    init : initExpenseLog,
    createOrUpdate : (log) => createOrUpdate('writing', log),
    get : (log) => get('writing', log)
  },
  expense : {
    init : initExpenseLog,
    createOrUpdate : (log) => createOrUpdate('expense', log),
    get : (log) => get('expense', log)
  },
}
