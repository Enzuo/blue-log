/*----------------------------------------------------------------------------
 * Migrations
 *
 * This module knows what migrations to do to have an up to date environement
 * It doesn't know anything about the database and how to execute the migrations
 *---------------------------------------------------------------------------*/

/* eslint-disable global-require */
import { SQLite, Asset, FileSystem } from 'expo';

import queries from './queries';

const migrationsQueries = [
  ['001', require('./migrations/001.sql')],
  ['002', require('./migrations/002.sql')],
];


/* Functions migrations
============================================================================= */
async function loadPrepopulatedDatabase(database, config) {
  // Database loaded from cache so not recreated
  // https://forums.expo.io/t/sqlite-db-doesnt-get-created-if-deleted/2295
  // https://github.com/expo/expo/issues/639
  // To avoid using the cached database and have a fresh new database
  // Generate a new name every time we generate a new database
  const randomNum = new Date().getTime();
  const dbName = `${randomNum}.db`;
  const dbUri = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  if (process.env.JEST_WORKER_ID !== undefined) {
    const { version, description, size } = config;
    return SQLite.openDatabase(`test\\${dbName}`, version, description, size);
  }

  await FileSystem.downloadAsync(
    // eslint-disable-next-line global-require
    Asset.fromModule(require('../assets/products.db')).uri,
    dbUri,
  );
  return SQLite.openDatabase(dbName);
}


/* Migration system : knows what migration to do but not how
============================================================================= */

const migrations = [
  loadPrepopulatedDatabase,
  '001',
  '002',
];


async function executeMigrations(currentVersion = 0, migrationHandler, setVersionHandler) {
  await queries.loadQueries(migrationsQueries);

  for (let i = currentVersion; i < migrations.length; i++) {
    console.log('migration : executing', i, migrations[i]);
    try {
      // eslint-disable-next-line no-await-in-loop
      await migrationHandler(migrations[i]);
    } catch (e) {
      console.error('migration error', e, i, migrations[i]);
      throw (e)
    }
  }

  setVersionHandler(migrations.length);
}


export default executeMigrations;
