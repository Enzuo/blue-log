INSERT INTO "Log"
  ("date", "type") VALUES (
    {{= date }}
  , 1
);

INSERT INTO "ProductLog"
  ("idLog", "qty", "name", "code", "energy", "fat", "saturated", "carbohydrates", "sugar", "fiber", "proteins", "salt", "serving", "isIncomplete") VALUES (
    last_insert_rowid()
  , {{= qty }}
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
FROM "Log"
INNER JOIN "ProductLog" ON "ProductLog"."idLog" = "Log"."id"
                        AND "ProductLog"."idLog" = last_insert_rowid()
