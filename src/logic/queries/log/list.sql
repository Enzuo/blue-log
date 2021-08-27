SELECT
   "Log"."id"
  ,"Log"."date"
  ,"Log"."type"
  ,"LogWriting"."comment" AS "value"
FROM "Log"
INNER JOIN "LogWriting" ON "LogWriting"."idLog" = "Log"."id"

UNION ALL

SELECT
   "Log"."id"
  ,"Log"."date"
  ,"Log"."type"
  ,"LogExpense"."amount" AS "value"
FROM "Log"
INNER JOIN "LogExpense" ON "LogExpense"."idLog" = "Log"."id"

ORDER BY "date" DESC
