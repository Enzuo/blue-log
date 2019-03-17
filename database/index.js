import { SQLite } from 'expo';

const name = 'test.db';
const version = '1.0';
const description = 'Test Database';
const size = 200000;

let database;

async function init() {
  // Expo : The version, description and size arguments are ignored, but are accepted by the function for compatibility with the WebSQL specification.
  database = await SQLite.openDatabase(name, version, description, size);

  console.log('database opened');
}

async function query() {
  database.transaction((tx) => {
    tx.executeSql(
      sqlStatement,
      values,
      (tx, resultSet) => {

      },
      (tx, error) => {

      },
    );
  },
  (error) => {
    console.log('database transaction error', error);
  },
  (success) => {
    console.log('database transaction success', success);
  });
}


export default () => {
  init();
  return { query };
};
