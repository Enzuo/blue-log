UPDATE "Log" SET
   "updatedAt" = CURRENT_TIMESTAMP
  ,"date" = DATETIME({{= date }})
WHERE "Log"."id" = {{= id }}
;

UPDATE "ExpenseLog" SET
  "amount" = {{= amount }}
WHERE "idLog" = {{= id }}
;
