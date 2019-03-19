INSERT INTO "Log"
  ("date") VALUES
  (CURRENT_TIMESTAMP)
;

INSERT INTO "RecipeLog"
  ("idLog", "name") VALUES
  (last_insert_rowid(), 'test')
;
