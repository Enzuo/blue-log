import { SQLite, Asset, FileSystem } from 'expo';
import queries from './queries';

const name = 'test.db';
const version = '1.0';
const description = 'Test Database';
const size = 200000;

let database;

async function init() {
  // Expo : The version, description and size arguments are ignored, but are accepted by the function for compatibility with the WebSQL specification.
  database = await SQLite.openDatabase(name, version, description, size);
  console.log('database opened');
  await queries.load();
  console.log('database queries loaded');

  await loadPrepopulatedDatabase();
}

async function loadPrepopulatedDatabase () {
  await FileSystem.downloadAsync(
    // eslint-disable-next-line global-require
    Asset.fromModule(require('../assets/products.db')).uri,
    `${FileSystem.documentDirectory}SQLite/db.db`, // If there is a file at this URI, its contents are replaced.
  );
  database = await SQLite.openDatabase('db.db');
}

const query = (queryName, object) => {
  console.log('executing query', queryName)
  const { sqlStatement, values } = queries.prepare(queryName, object);
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        sqlStatement,
        values,
        (tx, resultSet) => {
          console.log('query success', resultSet)
          resolve(resultSet);
        },
        (tx, error) => {
          console.log('query error', queryName, error)
          reject(error);
        },
      );
    },
    (error) => {
      console.log('database transaction error', error);
    },
    (success) => {
      console.log('database transaction success', success);
    });
  });
};

/* Exports
============================================================================= */

export default { init, query };
