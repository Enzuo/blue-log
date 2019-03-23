INSERT INTO "Log"
  ("date", "type") VALUES (
    {{= date }}
  , 1
);

INSERT INTO "ProductLog"
  ("idLog", "name", "code", "energy", "fat", "saturated", "carbohydrates", "sugar", "fiber", "proteins", "salt", "serving", "isIncomplete") VALUES (
    last_insert_rowid()
  , {{= name }}
  , {{= code }}
  , {{= energy }}
  , {{= fat }}
  , {{= saturated }}
  , {{= carbohydrates }}
  , {{= sugar }}
  , {{= fiber }}
  , {{= proteins }}
  , {{= salt }}
  , {{= serving }}
  , {{= isIncomplete }}
);

SELECT
   "Log"."id"            AS "id"
  ,"Log"."type"          AS "type"
  ,"Log"."date"          AS "date"
  ,"ProductLog"."id"     AS "idProductLog"
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
FROM "Log"
INNER JOIN "ProductLog" ON "ProductLog"."idLog" = "Log"."id"
                        AND "ProductLog"."id" = last_insert_rowid()
