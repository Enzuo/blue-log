SELECT
   "Log"."id"
  ,"Log"."type"
  ,"Log"."date"
  ,"LogWriting"."comment"
FROM "Log"
INNER JOIN "LogWriting" ON "LogWriting"."idLog" = "Log"."id"
WHERE "Log"."id" = {{= id }}
