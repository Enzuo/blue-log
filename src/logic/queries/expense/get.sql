SELECT
   "Log"."id"
  ,"Log"."type"
  ,"Log"."date"
  ,"LogExpense"."amount"
  ,"LogExpense"."comment"
FROM "Log"
INNER JOIN "LogExpense" ON "LogExpense"."idLog" = "Log"."id"
WHERE "Log"."id" = {{= id }}
