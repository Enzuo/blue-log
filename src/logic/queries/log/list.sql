
WITH logs AS (
  SELECT
     "Log"."id"            AS "id"
    ,"Log"."type"          AS "type"
    ,"Log"."date"          AS "date"
  FROM "Log"
  ORDER BY "date" DESC
)
,journal_log AS (
  SELECT
     logs.*
    ,"JournalLog"."comment" AS "value"
  FROM logs
  INNER JOIN "JournalLog" ON "JournalLog"."idLog" = logs."id"
)
SELECT * FROM journal_log
