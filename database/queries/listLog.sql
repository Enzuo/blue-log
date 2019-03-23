
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
  ORDER BY "date" DESC
