import fs from 'fs';
import path from 'path';
import database from '../src/database/database.jest';

console.log('DATABASE', database)
export const clearDataset = async () => {
  try {
    await database.querySql(`
      DELETE FROM "LogWriting";
      DELETE FROM "Log";
    `);
  } catch (e) {
    console.error(e);
  }
};

export const insertDataset = (name) => {
  const sql = fs.readFileSync(path.join('test/', name)).toString();
  console.log('dataset sql', sql);
  // const rawStatements = sql.split(/;(?!--p:o)/); // dumb split on ; add --;o to ommit them
  // const statements = rawStatements.filter(stt => stt.trim() !== '');
  return database.querySql(sql);
};
