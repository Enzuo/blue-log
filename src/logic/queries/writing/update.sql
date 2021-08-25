UPDATE "Log" SET
   "updatedAt" = CURRENT_TIMESTAMP
  ,"date" = DATETIME({{= date }})
WHERE "Log"."id" = {{= id }}
;

UPDATE "WritingLog" SET
  "comment" = {{= comment }}
WHERE "idLog" = {{= id }}
;
