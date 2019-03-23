/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */

export async function rowsToObj(webSqlResultSetPromise, isArray) {
  const resultSet = await webSqlResultSetPromise;
  if (isArray) {
    return resultSet.rows._array;
  }
  return resultSet.rows._array[0];
}
