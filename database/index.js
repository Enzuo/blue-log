import { SQLite, Asset, FileSystem } from 'expo';
import queries from './queries';
import migrations from './migrations';

const name = 'test.db';
const version = '1.0';
const description = 'Test Database';
const size = 200000;

let database;

const querySql = (sqlStatement, valuesArr) => {
  console.log('query for database', database)
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        sqlStatement,
        valuesArr,
        (tx, resultSet) => {
          console.log('query success', resultSet);
          resolve(resultSet);
        },
        (tx, error) => {
          console.log('query error', error);
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

const query = (queryName, object) => {
  console.log('executing query', queryName);
  const { sql, values } = queries.prepare(queryName, object);
  return querySql(sql, values);
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
        return null;
      }
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
