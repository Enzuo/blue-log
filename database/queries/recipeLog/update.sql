DELETE FROM "RecipeLogProduct"
WHERE "idRecipeLog" = {{= idLog }}
;

UPDATE "RecipeLog" SET
    "qty" = {{= qty }}
  , "name" = {{= name }}
;
