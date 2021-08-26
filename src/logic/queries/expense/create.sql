INSERT INTO "Log"
  ("date", "type", "updatedAt") VALUES (
    DATETIME({{= date }})
  , {{= type }}
  , CURRENT_TIMESTAMP
);

INSERT INTO "ExpenseLog"
  ("idLog", "amount", "idType", "comment", "idCurrency") VALUES (
    last_insert_rowid()
  , {{= amount }}
  , 1
  , {{= comment }}
  , 1
);

-- INSERT INTO "ExpenseType"
--   ("id", "name") VALUES (
--     1, 'lifestyle'
--   );
