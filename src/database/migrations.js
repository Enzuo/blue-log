import {migrations} from '../assets/_assets'
import loader from '../assets/loader'

/**
 *
 * @param {string[]} filter name of migrations to exclude
 * @returns
 */
export async function loadMigrations (filter) {

  let filteredMigrations = migrations.filter(m => filter.findIndex(name => name === m.name) === -1)
  let loadedMigrations = await loader.loadAll(filteredMigrations)

  return loadedMigrations
}
