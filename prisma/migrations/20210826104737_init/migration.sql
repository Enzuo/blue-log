-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "date" DATETIME NOT NULL,
    "type" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "WritingLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comment" TEXT NOT NULL,
    "idLog" INTEGER NOT NULL,
    FOREIGN KEY ("idLog") REFERENCES "Log" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExpenseLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "idCategory" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "idCurrency" INTEGER NOT NULL,
    "idLog" INTEGER NOT NULL,
    FOREIGN KEY ("idLog") REFERENCES "Log" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("idCategory") REFERENCES "ExpenseCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExpenseCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MovieLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "idLog" INTEGER NOT NULL,
    FOREIGN KEY ("idLog") REFERENCES "Log" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BookLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "idLog" INTEGER NOT NULL,
    FOREIGN KEY ("idLog") REFERENCES "Log" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PhotoLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comment" TEXT NOT NULL,
    "iso" INTEGER NOT NULL,
    "aperture" REAL NOT NULL,
    "speed" REAL NOT NULL,
    "film" TEXT,
    "idLog" INTEGER NOT NULL,
    FOREIGN KEY ("idLog") REFERENCES "Log" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FoodLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "saturated" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "sugar" INTEGER NOT NULL,
    "fiber" INTEGER NOT NULL,
    "proteins" INTEGER NOT NULL,
    "salt" INTEGER NOT NULL,
    "serving" INTEGER NOT NULL,
    "isIncomplete" BOOLEAN NOT NULL,
    "idLog" INTEGER NOT NULL,
    FOREIGN KEY ("idLog") REFERENCES "Log" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FoodLogProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "saturated" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "sugar" INTEGER NOT NULL,
    "fiber" INTEGER NOT NULL,
    "proteins" INTEGER NOT NULL,
    "salt" INTEGER NOT NULL,
    "serving" INTEGER NOT NULL,
    "isIncomplete" BOOLEAN NOT NULL,
    "idFoodLog" INTEGER NOT NULL,
    FOREIGN KEY ("idFoodLog") REFERENCES "FoodLog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
