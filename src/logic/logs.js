import * as storage from './storage'

export const LOG_TYPES = [
  {type : 1, name : 'writing', icon : 'fountain-pen-tip', label : 'Writing'},
  {type : 2, name : 'expense', icon : 'cash-multiple', label : 'Expense'},
  {type : 3, name : 'movie'  , icon : 'movie', label : 'Movie'},
  {type : 4, name : 'book'   , icon : 'book', label : 'Book'},
  {type : 5, name : 'photo'  , icon : 'camera', label : 'Photo'},
]

// export async function createLog(log){
//   storage.call('log/create', log)
// }

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

/**
 *
 * @param {{date:number, comment:string}} log
 * @returns
 */
export async function createWritingLog(log){
  let type = LOG_TYPES.find(l => l.name === 'writing').type
  let payload = {...log, type}
  return storage.call('writing/create.sql', payload)
}


/**
 *
 * @param {{date:number, comment:string}} log
 * @returns
 */
export async function updateWritingLog(log){
  let payload = log
  return storage.call('writing/update.sql', payload)
}


/**
 *
 * @param {{id:number}} log
 * @returns {Promise<{id:number, type:number, date:number, comment:string}>}
 */
export async function getWritingLog(log){
  let payload = {id: log.id}
  let result = await storage.call('writing/get.sql', payload)
  console.log('getWritingLog', result)
  return result[0]
}


export async function createExpenseLog(log){
  let type = LOG_TYPES.find(l => l.name === 'expense').type
  let payload = {...log, type}
  return storage.call('expense/create.sql', payload)
}
