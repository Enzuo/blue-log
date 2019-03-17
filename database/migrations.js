/* eslint-disable global-require */
import { SQLite, Asset, FileSystem } from 'expo';

import queries from './queries';

const migrationsQueries = [
  ['001', require('./migrations/001.sql')],
  ['002', require('./migrations/002.sql')],
];


/* Functions migrations
============================================================================= */
async function loadPrepopulatedDatabase(database, name) {
  await FileSystem.downloadAsync(
    // eslint-disable-next-line global-require
    Asset.fromModule(require('../assets/products.db')).uri,
    `${FileSystem.documentDirectory}SQLite/db.db`, // If there is a file at this URI, its contents are replaced.
  );
  // database = await SQLite.openDatabase('db.db');
  return SQLite.openDatabase('db.db');
  // console.log('new database open', database)
}


/* Migration system : knows what migration to do but not how
============================================================================= */

const migrations = [
  loadPrepopulatedDatabase,
  '001',
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
