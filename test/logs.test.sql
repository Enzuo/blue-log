INSERT INTO "Log" ("id", "date", "type")
VALUES (1, '121', 1);

INSERT INTO "Log" ("id", "date", "type")
VALUES (2, '122', 1);

INSERT INTO "Log" ("id", "date", "type")
VALUES (3, '123', 1);

INSERT INTO "Log" ("id", "date", "type")
VALUES (4, '124', 2);

INSERT INTO "ProductLog" ("idLog", "name", "energy")
VALUES (1, 'carrote', 25);

INSERT INTO "ProductLog" ("idLog", "name", "energy")
VALUES (2, 'carrote', 50);

INSERT INTO "ProductLog" ("idLog", "name", "energy")
VALUES (3, 'patate', 75);

INSERT INTO "RecipeLog" ("idLog", "name", "qty")
VALUES (4, 'recette patate', 1);

INSERT INTO "RecipeLogProduct" ("idRecipeLog", "name", "qty")
VALUES (4, 'patate', 1);
