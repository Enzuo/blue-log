/* eslint-disable global-require */
import { Asset } from 'expo';


const allQueries = new Map([
  ['selectProduct', require('./queries/selectProduct.sql')],
  ['insertProduct', require('./queries/insertProduct.sql')],
]);

let loadedQueries = [];

async function loadQuery(queryFileModule) {
  let file = Asset.fromModule(queryFileModule);
  file = await fetch(file.uri);
  const fileContent = await file.text();
  return fileContent;
}

async function loadQueries(queries) {
  const loadQueriesPromises = [...queries].map(async ([key, file]) => {
    const sql = await loadQuery(file);
    return [key, sql];
  });
  const loadedQueriesArr = await Promise.all(loadQueriesPromises);
  loadedQueries = new Map([...loadedQueries, ...loadedQueriesArr]);
  return loadedQueries;
}

async function init() {
  loadedQueries = await loadQueries(allQueries);
  return loadedQueries;
}

function prepare(queryName, values) {
  const sql = loadedQueries.get(queryName);
  return {
    sqlStatement: sql,
    values: [],
  };
}

export default { init, loadQueries, prepare };
