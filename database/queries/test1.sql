
INSERT INTO "Log" ("date") VALUES
  (CURRENT_TIMESTAMP)
;


INSERT INTO "ProductLog" ("idLog")
  SELECT last_insert_rowid()
;
