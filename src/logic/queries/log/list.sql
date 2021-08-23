
WITH logs AS (
  SELECT
     "Log"."id"            AS "id"
    ,"Log"."type"          AS "type"
    ,"Log"."date"          AS "date"
  FROM "Log"
  ORDER BY "date" DESC
)
,writing_log AS (
  SELECT
     logs.*
    ,"WritingLog"."comment" AS "value"
  FROM logs
  INNER JOIN "WritingLog" ON "WritingLog"."idLog" = logs."id"
)
,expense_log AS (
  SELECT
     logs.*
    ,"ExpenseLog"."amount" AS "value"
  FROM logs
  INNER JOIN "ExpenseLog" ON "ExpenseLog"."idLog" = logs."id"
)
SELECT * FROM writing_log
UNION ALL
SELECT * FROM expense_log

ORDER BY "date" DESC
