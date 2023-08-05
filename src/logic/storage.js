import database from '../database/database'

/**
 * Simple middleman between logic and database storage
 * @param {string} name
 * @param {object=} payload
 */
export async function call(name, payload) {
  let result = await database.queryFile(name, payload)
  return result
}
