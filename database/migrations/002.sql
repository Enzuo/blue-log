DROP TABLE IF EXISTS "Log"; -- fix cache problem when recreating database from assets
CREATE TABLE "Log" (
   "id" SERIAL
  ,"date" INTEGER
  ,"dateCreated" INTEGER
  ,"dateUpdated" INTEGER
);

DROP TABLE IF EXISTS "ProductLog"; -- fix cache problem when recreating database
CREATE TABLE "ProductLog"(
   "id" INTEGER PRIMARY KEY
  ,"idLog" INTEGER
  ,"qty" INTEGER
  ,"name" TEXT
  ,"code" INTEGER
  ,"energy" REAL
  ,"fat" REAL
  ,"saturated" REAL
  ,"carbohydrates" REAL
  ,"sugar" REAL
  ,"fiber" REAL
  ,"proteins" REAL
  ,"salt" REAL
  ,"serving" REAL
  ,FOREIGN KEY("idLog") REFERENCES "Log"("id")
);
