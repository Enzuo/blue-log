import * as storage from './storage'

export const LOG_TYPES = [
  {type : 1, name : 'writing'},
  {type : 2, name : 'expense'},
  {type : 3, name : 'movie'},
  {type : 4, name : 'book'},
  {type : 5, name : 'photo'},
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
  return storage.call('log/list.sql')
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

export async function createExpenseLog(log){
  let type = LOG_TYPES.find(l => l.name === 'expense').type
  let payload = {...log, type}
  return storage.call('expense/create.sql', payload)
}
