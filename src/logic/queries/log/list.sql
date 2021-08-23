SELECT
   "Log"."id"
  ,"Log"."date"
  ,"Log"."type"
  ,"WritingLog"."comment" AS "value"
FROM "Log"
INNER JOIN "WritingLog" ON "WritingLog"."idLog" = "Log"."id"

UNION ALL

SELECT
   "Log"."id"
  ,"Log"."date"
  ,"Log"."type"
  ,"ExpenseLog"."amount" AS "value"
FROM "Log"
INNER JOIN "ExpenseLog" ON "ExpenseLog"."idLog" = "Log"."id"

ORDER BY "date" DESC
