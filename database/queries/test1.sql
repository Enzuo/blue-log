
INSERT INTO "Log" ("date", "type") VALUES
  (CURRENT_TIMESTAMP, 1)
;


INSERT INTO "ProductLog" ("idLog")
  SELECT last_insert_rowid()
;
