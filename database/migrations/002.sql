CREATE TABLE "Log" (
   "id" SERIAL
  ,"date" INTEGER
  ,"dateCreated" INTEGER
  ,"dateUpdated" INTEGER
);

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
