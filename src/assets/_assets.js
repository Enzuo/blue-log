
export const migrations = [

  {name: '20210815100322_init', module : require('../../prisma/migrations/20210815100322_init/migration.sql')},
  {name: '20210815160724_migration_two', module : require('../../prisma/migrations/20210815160724_migration_two/migration.sql')}
]

export default {migrations}
