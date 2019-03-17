/* eslint-disable global-require */
import { Asset } from 'expo';


const allQueries = new Map([
  ['selectProduct', require('./queries/selectProduct.sql')],
  ['insertProduct', require('./queries/insertProduct.sql')],
]);

let loadedQueries = null;

async function loadQuery(queryFileModule) {
  let file = Asset.fromModule(queryFileModule);
  file = await fetch(file.uri);
  const fileContent = await file.text();
  return fileContent;
}

async function loadAllQueries() {
  const loadQueriesPromises = [...allQueries].map(async ([key, file]) => {
    const sql = await loadQuery(file);
    return [key, sql];
  });
  const loadedQueriesArr = await Promise.all(loadQueriesPromises);
  return new Map(loadedQueriesArr);
}

async function load() {
  loadedQueries = await loadAllQueries();
  return loadedQueries;
}

function prepare(queryName, values) {
  const sql = loadedQueries.get(queryName);
  return {
    sqlStatement: sql,
    values: [],
  };
}

export default { load, prepare };
