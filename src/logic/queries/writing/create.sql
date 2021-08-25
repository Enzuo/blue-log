INSERT INTO "Log"
  ("date", "type", "updatedAt") VALUES (
    {{= date }}
  , {{= type }}
  , CURRENT_TIMESTAMP
);

INSERT INTO "WritingLog"
  ("idLog", "comment") VALUES (
    last_insert_rowid()
  , {{= comment }}
);