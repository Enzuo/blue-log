UPDATE "Log" SET
  "date" = {{= date }}
WHERE "id" = {{= id }}
;

UPDATE "ProductLog" SET
    "qty" = {{= qty }}
  , "name" = {{= name }}
  , "code" = {{= code }}
  , "energy" = {{= energy }}
  , "fat" = {{= fat }}
  , "saturated" = {{= saturated }}
  , "carbohydrates" = {{= carbohydrates }}
  , "sugar" = {{= sugar }}
  , "fiber" = {{= fiber }}
  , "proteins" = {{= proteins }}
  , "salt" = {{= salt }}
  , "serving" = {{= serving }}
  , "isIncomplete" = {{= isIncomplete }}
WHERE "idLog" = {{= id }}
;
