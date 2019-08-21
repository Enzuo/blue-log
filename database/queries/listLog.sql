
WITH logs AS (
  SELECT
     "Log"."id"            AS "id"
    ,"Log"."type"          AS "type"
    ,"Log"."date"          AS "date"
  FROM "Log"
  ORDER BY "date" DESC
)
,product_log AS (
  SELECT
     "ProductLog"."idLog"     AS "idProductLog"
    ,"ProductLog"."qty"
    ,"ProductLog"."name"
    ,"ProductLog"."code"
    ,"ProductLog"."energy"
    ,"ProductLog"."fat"
    ,"ProductLog"."saturated"
    ,"ProductLog"."carbohydrates"
    ,"ProductLog"."sugar"
    ,"ProductLog"."fiber"
    ,"ProductLog"."proteins"
    ,"ProductLog"."salt"
    ,"ProductLog"."serving"
    ,"ProductLog"."isIncomplete"
  FROM logs
  INNER JOIN "ProductLog" ON "ProductLog"."idLog" = logs."id"
                         AND logs."type" = 1
)
,recipe_log AS (
  SELECT
     "RecipeLog"."idLog"     AS "idRecipeLog"
    ,"RecipeLog"."qty"
    ,"RecipeLog"."name"
    ,"RecipeLogProduct"."id"   AS "products:id"
    ,"RecipeLogProduct"."qty"   AS "products:qty"
    ,"RecipeLogProduct"."name"  AS "products:name"
    ,"RecipeLogProduct"."code"  AS "products:code"
    ,"RecipeLogProduct"."energy" AS "products:energy"
    ,"RecipeLogProduct"."fat"     AS "products:fat"
    ,"RecipeLogProduct"."saturated" AS "products:saturated"
    ,"RecipeLogProduct"."carbohydrates" AS "products:carbohydrates"
    ,"RecipeLogProduct"."sugar" AS "products:sugar"
    ,"RecipeLogProduct"."fiber" AS "products:fiber"
    ,"RecipeLogProduct"."proteins" AS "products:proteins"
    ,"RecipeLogProduct"."salt" AS "products:salt"
    ,"RecipeLogProduct"."serving" AS "products:serving"
    ,"RecipeLogProduct"."isIncomplete" AS "products:isIncomplete"
  FROM logs
  INNER JOIN "RecipeLog" ON "RecipeLog"."idLog" = logs."id"
  LEFT JOIN "RecipeLogProduct" ON "RecipeLogProduct"."idRecipeLog" = "RecipeLog"."idLog"
)
SELECT
   logs.*
  ,product_log.*
  ,recipe_log.*
FROM logs
INNER JOIN product_log ON logs."id" = product_log."idProductLog"
LEFT JOIN recipe_log ON 1=0

UNION ALL

SELECT
   logs.*
  ,product_log.*
  ,recipe_log.*
FROM logs
LEFT JOIN product_log ON 1=0
INNER JOIN recipe_log ON logs."id" = recipe_log."idRecipeLog"

ORDER BY "date" DESC
