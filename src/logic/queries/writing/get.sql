SELECT
   "Log"."id"
  ,"Log"."type"
  ,"Log"."date"
  ,"WritingLog"."comment"
FROM "Log"
INNER JOIN "WritingLog" ON "WritingLog"."idLog" = "Log"."id"
WHERE "Log"."id" = {{= id }}
