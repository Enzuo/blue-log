SELECT
   "Log"."id"
  ,"Log"."type"
  ,"Log"."date"
  ,"ExpenseLog"."amount"
FROM "Log"
INNER JOIN "ExpenseLog" ON "ExpenseLog"."idLog" = "Log"."id"
WHERE "Log"."id" = {{= id }}
