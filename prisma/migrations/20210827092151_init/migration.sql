-- CreateTable
CREATE TABLE "Log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "date" DATETIME NOT NULL,
    "type" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "LogWriting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idLog" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    FOREIGN KEY ("idLog") REFERENCES "Log" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LogExpense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idLog" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "idCategory" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "idCurrency" INTEGER NOT NULL,
    FOREIGN KEY ("idLog") REFERENCES "Log" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("idCategory") REFERENCES "ExpenseCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExpenseCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LogMovie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idLog" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    FOREIGN KEY ("idLog") REFERENCES "Log" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LogBook" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idLog" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    FOREIGN KEY ("idLog") REFERENCES "Log" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LogPhoto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idLog" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "iso" INTEGER NOT NULL,
    "aperture" REAL NOT NULL,
    "speed" REAL NOT NULL,
    "film" TEXT,
    FOREIGN KEY ("idLog") REFERENCES "Log" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LogFood" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idLog" INTEGER NOT NULL,
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
    FOREIGN KEY ("idLog") REFERENCES "Log" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idFoodLog" INTEGER NOT NULL,
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
    FOREIGN KEY ("idFoodLog") REFERENCES "LogFood" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
