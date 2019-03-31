INSERT INTO "Log"
  ("date", "type") VALUES (
    {{= date }}
  , 2
);

INSERT INTO "RecipeLog"
  ("idLog", "qty", "name") VALUES (
    last_insert_rowid()
  , {{= qty }}
  , {{= name }}
);

SELECT "idLog" FROM "RecipeLog" WHERE rowid = last_insert_rowid();
