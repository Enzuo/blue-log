INSERT INTO "RecipeLogProduct"
  ("idRecipeLog", "qty", "name", "code", "energy", "fat", "saturated", "carbohydrates", "sugar", "fiber", "proteins", "salt", "serving", "isIncomplete") VALUES (
    {{= idRecipeLog }}
  , {{= qty }}
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
