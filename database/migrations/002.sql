CREATE TABLE "Log" (
   "id" INTEGER PRIMARY KEY
  ,"date" INTEGER NOT NULL
  ,"dateCreated" INTEGER DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ProductLog"(
   "id" INTEGER PRIMARY KEY
  ,"idLog" INTEGER
  ,"qty" INTEGER
  ,"name" TEXT
  ,"code" INTEGER
  ,"energy" NUMERIC
  ,"fat" NUMERIC
  ,"saturated" NUMERIC
  ,"carbohydrates" NUMERIC
  ,"sugar" NUMERIC
  ,"fiber" NUMERIC
  ,"proteins" NUMERIC
  ,"salt" NUMERIC
  ,"serving" NUMERIC
  ,"dateUpdated" INTEGER DEFAULT CURRENT_TIMESTAMP
  ,FOREIGN KEY("idLog") REFERENCES "Log"("id")
);

CREATE TRIGGER AFTER UPDATE ON "ProductLog" FOR EACH ROW
BEGIN
  UPDATE "ProductLog" SET "dateUpdated" = CURRENT_TIMESTAMP WHERE id = NEW.id;--p:o
END;
