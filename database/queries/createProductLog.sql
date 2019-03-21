INSERT INTO "Log"
  ("date", "type") VALUES (
    {{= date }}
  , 1
);

INSERT INTO "ProductLog"
  ("idLog", "name", "code", "energy", "fat", "saturated", "carbohydrates", "sugar", "fiber", "proteins", "salt", "serving", "isIncomplete") VALUES (
    last_insert_rowid()
  , {{= name }}
  , {{= code }}
  , {{= energy }}
  , {{= fat }}
  , {{= saturated }}
  , {{= carbohydrates }}
  , {{= sugar }}
  , {{= fiber }}
  , {{= proteins }}
  , {{= salt }}
  , {{= serving }}
  , {{= isIncomplete }}
);
