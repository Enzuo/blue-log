import database from '../database/database'

/**
 * Simple middleman between logic and database storage
 * @param {*} name
 */
export async function call(name, payload) {
  let result = await database.queryFile(name, payload)
  return result
}
