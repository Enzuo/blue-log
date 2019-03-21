import database from '../database';

// scenario 1
async function scenario1() {
  const recipe = {
    name: 'my recipe',
    products: [{
      name: 'courgettes',
    },
    {
      name: 'tomates',
    },
    ],
  };

  const createdRecipe = await database.query('createRecipeLog', recipe);
  // const recipeProducts = recipe.products.map(product => ({ idRecipe: createdRecipe.id, ...product }));
  const recipeProducts = recipe.products.map((product) => {
    return { ...product, idRecipeLog: createdRecipe[1].res.insertId };
  });
  await database.query('createRecipeLogProduct', recipeProducts);
  const res = await database.querySql('SELECT * FROM "RecipeLogProduct"');
  console.log('result select RecipeLogProduct', res);
}

export default { scenario1 };
