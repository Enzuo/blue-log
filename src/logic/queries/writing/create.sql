INSERT INTO "Log"
  ("date", "type", "updatedAt") VALUES (
    DATETIME({{= date }})
  , {{= type }}
  , CURRENT_TIMESTAMP
);

INSERT INTO "LogWriting"
  ("idLog", "comment") VALUES (
    last_insert_rowid()
  , {{= comment }}
);
