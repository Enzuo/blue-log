INSERT INTO "Log"
  ("date", "type") VALUES (
    {{= date }}
  , 2
);

INSERT INTO "RecipeLog"
  ("idLog", "name") VALUES (
    last_insert_rowid()
  , {{= name }}
);
