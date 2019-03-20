/*----------------------------------------------------------------------------
 * Database
 *
 * This module knows the sqlite database, how to interact with it
 * Expose a simple database agnostic interface to get our data
 * It cares about the database and make sure it's up to date.
 *---------------------------------------------------------------------------*/

/* eslint-disable arrow-body-style */
import { SQLite } from 'expo';
import queries from './queries';
import migrations from './migrations';

const name = 'test.db';
const version = '1.0';
const description = 'Test Database';
const size = 200000;

let database;


const openTransaction = (transactionHandler) => {
  console.log('openTransaction');
  return new Promise((resolve, reject) => {
    database.transaction(async (tx) => {
      const results = await Promise.all(transactionHandler(tx));
      resolve(results);
    },
    (error) => {
      console.log('database transaction error', error);
      reject(error);
    },
    (success) => {
      console.log('database transaction success', success);
    });
  });
};

const executeSqlAsync = (transaction, sql, val, item) => new Promise((resolve, reject) => {
  console.log('execute sql', sql, val);
  transaction.executeSql(sql, val, (tx, res) => {
    resolve({ res, item });
  }, (tx, err) => {
    reject(err);
  });
});

const querySql = (sqlStatement, values) => {
  return openTransaction((tx) => {
    // TODO openTransaction only accept array of promises
    return [executeSqlAsync(tx, sqlStatement, values)];
  });
};

const executeStatements = (sqlStatementsArr) => {
  return (tx) => {
    const executePromises = sqlStatementsArr.map((sqlStatements) => {
      return sqlStatements.map((sqlStatement) => {
        return executeSqlAsync(tx, sqlStatement.sql, sqlStatement.val, sqlStatement.item)
      });
    });
    return [].concat(...executePromises);
    // return executePromises.flat();
  };
};

/**
 * 1) queryName can be a query composed of multiples statements,
 * we all want to do them in one transaction
 * 2) Data can be an array, we want to compute the query for each item
 * and then return a response for each item
 * @param {String} queryName
 * @param {Object/Array} data if data is an Array it'll call the same query for each item
 * @returns {Object/Array} if data is an Array return an array of results
 */
const query = (queryName, data) => {
  console.log('executing query', queryName);
  let sqlStatementsArr = null;
  if (Array.isArray(data)) {
    sqlStatementsArr = data.map(dataItem => queries.prepare(queryName, dataItem));
    // [ [{sql, val}, {sql, val}], [{sql, val}, {sql, val}] ]
  } else {
    const sqlStatements = queries.prepare(queryName, data);
    // [{sql, val}, {sql, val}]
    sqlStatementsArr = [sqlStatements];
  }
  return openTransaction(executeStatements(sqlStatementsArr));
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

// eslint-disable-next-line no-underscore-dangle
const getName = () => database._db._name;


/* Exports
============================================================================= */

export default { init, query, querySql, getName };
