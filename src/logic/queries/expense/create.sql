INSERT INTO "Log"
  ("date", "type", "updatedAt") VALUES (
    DATETIME({{= date }})
  , {{= type }}
  , CURRENT_TIMESTAMP
);

INSERT INTO "LogExpense"
  ("idLog", "amount", "idCategory", "comment", "idCurrency") VALUES (
    last_insert_rowid()
  , {{= amount }}
  , 1
  , {{= comment }}
  , 1
);

-- INSERT INTO "ExpenseCategory"
--   ("id", "name") VALUES (
--     1, 'lifestyle'
--   );
