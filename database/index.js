/*----------------------------------------------------------------------------
 * Database
 *
 * This module knows the sqlite database, how to interact with it
 * Expose a simple database agnostic interface to get our data
 * It cares about the database and make sure it's up to date.
 *---------------------------------------------------------------------------*/

/* eslint-disable arrow-body-style */
import { SQLite } from 'expo-sqlite';
import queries from './queries';
import migrations from './migrations';

if (process.env.JEST_WORKER_ID !== undefined) {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const websql = require('websql');
  SQLite.openDatabase = websql;
}

const config = {
  name: 'test.db',
  version: '1.0',
  description: 'Test Database',
  size: 200000,
};

let dbConnection;

/* Initialization system
============================================================================= */
let isInit = false;
const initListeners = [];

const setInit = () => {
  initListeners.map(listener => listener());
  isInit = true;
};

const waitInit = () => {
  return new Promise((resolve) => {
    if (isInit) {
      return resolve();
    }
    return initListeners.push(() => {
      resolve();
    });
  });
};


/* Queries
============================================================================= */

const openTransaction = (transactionHandler) => {
  console.log('openTransaction');
  return new Promise((resolve, reject) => {
    dbConnection.transaction(async (tx) => {
      let results = null;
      try {
        results = await Promise.all(transactionHandler(tx));
      } catch (e) {
        reject(e);
      }
      return resolve(results);
    },
    (error) => {
      // console.log('database transaction error', error);
      reject(error);
    },
    (success) => {
      // console.log('database transaction success', success);
    });
  });
};

const executeSqlAsync = (transaction, sql, val, opts) => new Promise((resolve, reject) => {
  console.log('execute sql', sql, val);
  transaction.executeSql(sql, val, (tx, res) => {
    resolve({ res, opts });
  }, (tx, err) => {
    reject(err);
  });
});

const querySql = (sqlStatement, values) => {
  return openTransaction((tx) => {
    if (Array.isArray(sqlStatement)) {
      return sqlStatement.map((stt) => {
        return executeSqlAsync(tx, stt, values);
      });
    }
    // TODO openTransaction only accept array of promises
    return [executeSqlAsync(tx, sqlStatement, values)];
  });
};

const executeStatements = (sqlStatementsArr) => {
  return (tx) => {
    const executePromises = sqlStatementsArr.map((sqlStatements) => {
      const len = sqlStatements.length;
      return sqlStatements.map((stt, index) => {
        return executeSqlAsync(tx, stt.sql, stt.values, { last: len === index + 1 });
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
const query = async (queryName, data) => {
  console.log('executing query', queryName, data);
  let sqlStatementsArr = null;
  if (Array.isArray(data)) {
    sqlStatementsArr = data.map(dataItem => queries.prepare(queryName, dataItem));
    // [ [{sql, values}, {sql, values}], [{sql, values}, {sql, values}] ]
  } else {
    const sqlStatements = queries.prepare(queryName, data);
    // [{sql, values}, {sql, values}]
    sqlStatementsArr = [sqlStatements];
  }
  const results = await openTransaction(executeStatements(sqlStatementsArr));
  // only return last result if there is a chain of statments in a single sql file
  const lastResults = results.filter(res => res.opts.last);
  return lastResults.length > 1 ? lastResults : lastResults[0].res;
};

async function init() {
  // Expo : The version, description and size arguments are ignored, but are accepted by the function for compatibility with the WebSQL specification.
  const { name, version, description, size } = config;
  dbConnection = await SQLite.openDatabase(name, version, description, size);
  console.log('database opened', dbConnection);

  await queries.init();
  console.log('database queries loaded');

  await migrations(
    undefined,
    async (migration) => {
      if (typeof migration === 'function') {
        dbConnection = await migration(dbConnection, config);
        return null;
      }
      return query(migration);
    },
    (v) => {
      console.log('database migrations set version to', v);
    },
  );
  console.log('database migrations done');
  setInit();
}

// eslint-disable-next-line no-underscore-dangle
const getName = () => dbConnection._db._name;


/* Exports
============================================================================= */

export default {
  init,
  query: async (queryName, data) => {
    console.log('query', queryName);
    await waitInit();
    return query(queryName, data);
  },
  querySql: async (sql, data) => {
    await waitInit();
    return querySql(sql, data);
  },
  getName,
};
