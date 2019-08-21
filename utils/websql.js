/* eslint-disable no-underscore-dangle */
import Treeize from 'treeize';


export async function rowsToObj(webSqlResultSetPromise, isArray, isTree) {
  const resultSet = await webSqlResultSetPromise;
  console.log('resultSet', resultSet)
  let result = resultSet.rows._array;
  if (!result.length) {
    throw new Error('rowsToObj : no result');
  }
  if (isTree) {
    const tree = new Treeize();
    tree.grow(result);
    result = tree.getData();
  }
  if (isArray) {
    return result;
  }
  return result[0];
}

export async function waitAndReturn(promise, object) {
  await promise;
  return object;
}
