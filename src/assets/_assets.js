
export const migrations = [
  
  {name: '20210826104737_init', module : require('../../prisma/migrations/20210826104737_init/migration.sql')}
]

export const queries = [
  
  {name: 'expense/create.sql', module : require('../../src/logic/queries/expense/create.sql')},
  {name: 'expense/get.sql', module : require('../../src/logic/queries/expense/get.sql')},
  {name: 'expense/remove.sql', module : require('../../src/logic/queries/expense/remove.sql')},
  {name: 'expense/update.sql', module : require('../../src/logic/queries/expense/update.sql')},
  {name: 'log/_old_cte_list.sql', module : require('../../src/logic/queries/log/_old_cte_list.sql')},
  {name: 'log/list.sql', module : require('../../src/logic/queries/log/list.sql')},
  {name: 'writing/create.sql', module : require('../../src/logic/queries/writing/create.sql')},
  {name: 'writing/get.sql', module : require('../../src/logic/queries/writing/get.sql')},
  {name: 'writing/remove.sql', module : require('../../src/logic/queries/writing/remove.sql')},
  {name: 'writing/update.sql', module : require('../../src/logic/queries/writing/update.sql')}
]

export default {migrations, queries}
