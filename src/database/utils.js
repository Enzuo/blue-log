/**
 *
 * @param {string} sql
 * @returns
 */
export function splitStatements(sql){
  const rawStatements = sql.split(/;(?!--p:o)/); // dumb split on ; add --;o to ommit them
  const statements = rawStatements.filter(stt => stt.trim() !== '');
  return statements
}
