/* eslint-disable global-require */
import { Asset } from 'expo';


const allQueries = new Map([
  ['createRecipeLog', require('./queries/createRecipeLog.sql')],
  ['createRecipeLogProduct', require('./queries/createRecipeLogProduct.sql')],
  ['insertProduct', require('./queries/insertProduct.sql')],
  ['listLog', require('./queries/listLog.sql')],
  ['selectProduct', require('./queries/selectProduct.sql')],
  ['test1', require('./queries/test1.sql')],
  ['test2', require('./queries/test2.sql')],
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
    const rawStatements = sql.split(/;(?!--p:o)/); // dumb split on ; add --;o to ommit them
    const statements = rawStatements.filter(stt => stt.trim() !== '');
    return [key, statements];
  });
  const loadedQueriesArr = await Promise.all(loadQueriesPromises);
  loadedQueries = new Map([...loadedQueries, ...loadedQueriesArr]);
  return loadedQueries;
}

async function init() {
  loadedQueries = await loadQueries(allQueries);
  return loadedQueries;
}

/**
 *
 * @param {String} queryName
 * @param {Object} values
 * @returns return an array of queries to execute
 */
function prepare(queryName, values) {
  const statements = loadedQueries.get(queryName);
  return statements.map((sql) => {
    return {
      sql,
      val: values,
  }});
}

export default { init, loadQueries, prepare };
