import { SQLite, Asset, FileSystem } from 'expo';
import queries from './queries';
import migrations from './migrations';

const name = 'test.db';
const version = '1.0';
const description = 'Test Database';
const size = 200000;

let database;

const query = (queryName, object) => {
  console.log('executing query', queryName);
  const { sqlStatement, values } = queries.prepare(queryName, object);
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        sqlStatement,
        values,
        (tx, resultSet) => {
          console.log('query success', resultSet);
          resolve(resultSet);
        },
        (tx, error) => {
          console.log('query error', queryName, error);
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

async function init() {
  // Expo : The version, description and size arguments are ignored, but are accepted by the function for compatibility with the WebSQL specification.
  database = await SQLite.openDatabase(name, version, description, size);
  console.log('database opened', database);

  await queries.init();
  console.log('database queries loaded');

  await migrations(
    undefined,
    async (migration) => {
      if (typeof migration === 'function') {
        database = await migration(database, name);
        return;
      }
      console.log('current db opened', database);
      return query(migration);
    },
    (v) => {
      console.log('database migrations set version to', v);
    },
  );
  console.log('database migrations done');
}


/* Exports
============================================================================= */

export default { init, query };
