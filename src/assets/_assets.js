
export const migrations = [
  
  {name: '20210821201437_init', module : require('../../prisma/migrations/20210821201437_init/migration.sql')}
]

export const queries = [
  
  {name: 'log/list.sql', module : require('../../src/logic/queries/log/list.sql')}
]

export default {migrations, queries}
