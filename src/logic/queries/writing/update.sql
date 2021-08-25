UPDATE "Log" SET
   "updatedAt" = CURRENT_TIMESTAMP
  ,"date" = {{= date }}
WHERE "Log"."id" = {{= id }}
;

UPDATE "WritingLog" SET
  "comment" = {{= comment }}
WHERE "idLog" = {{= id }}
;
