import * as storage from './storage'

export const LOG_TYPES = [
  {type : 1, log : 'writing'},
  {type : 2, log : 'expense'},
  {type : 3, log : 'movie'},
  {type : 4, log : 'book'},
  {type : 5, log : 'photo'},
]

// export async function createLog(log){
//   storage.call('log/create', log)
// }

export async function listLog(){
  return storage.call('log/list')
}
