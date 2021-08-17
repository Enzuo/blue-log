
export const migrations = [
  
  {name: '20210815100322_init', module : require('../../prisma/migrations/20210815100322_init/migration.sql')},
  {name: '20210815160724_migration_two', module : require('../../prisma/migrations/20210815160724_migration_two/migration.sql')},
  {name: '20210815160725_migration_three', module : require('../../prisma/migrations/20210815160725_migration_three/migration.sql')}
]

export const queries = [
  
  {name: 'log/delete.sql', module : require('../../database/queries/log/delete.sql')},
  {name: 'productLog/create.sql', module : require('../../database/queries/productLog/create.sql')},
  {name: 'productLog/update.sql', module : require('../../database/queries/productLog/update.sql')},
  {name: 'recipeLog/create.sql', module : require('../../database/queries/recipeLog/create.sql')},
  {name: 'recipeLog/createProducts.sql', module : require('../../database/queries/recipeLog/createProducts.sql')},
  {name: 'recipeLog/select.sql', module : require('../../database/queries/recipeLog/select.sql')},
  {name: 'recipeLog/update.sql', module : require('../../database/queries/recipeLog/update.sql')},
  {name: 'createRecipeLog.sql', module : require('../../database/queries/createRecipeLog.sql')},
  {name: 'createRecipeLogProduct.sql', module : require('../../database/queries/createRecipeLogProduct.sql')},
  {name: 'insertProduct.sql', module : require('../../database/queries/insertProduct.sql')},
  {name: 'listLog.sql', module : require('../../database/queries/listLog.sql')},
  {name: 'selectProduct.sql', module : require('../../database/queries/selectProduct.sql')},
  {name: 'test1.sql', module : require('../../database/queries/test1.sql')},
  {name: 'test2.sql', module : require('../../database/queries/test2.sql')}
]

export default {migrations, queries}
