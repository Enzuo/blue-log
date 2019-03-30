DELETE FROM "ProductLog"
WHERE "idLog" IN( {{= ids }} )
;

DELETE FROM "RecipeLogProduct"
WHERE "idRecipeLog" IN( {{= ids }} )
;

DELETE FROM "RecipeLog"
WHERE "idLog" IN( {{= ids }} )
;

DELETE FROM "Log"
WHERE "id" IN( {{= ids }} )
;

