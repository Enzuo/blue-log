
export const migrations = [

  {name: '20210820182402_init', module : require('../../prisma/migrations/20210820182402_init/migration.sql')}
]

export const queries = [

  {name: 'log/list.sql', module : require('../../src/logic/queries/log/list.sql')}
]

export default {migrations, queries}
