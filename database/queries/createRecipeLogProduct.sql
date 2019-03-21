INSERT INTO "RecipeLogProduct"
  ("idRecipeLog", "name", "code", "energy", "fat", "saturated", "carbohydrates", "sugar", "fiber", "proteins", "salt", "serving", "isIncomplete") VALUES (
    {{= idRecipeLog }}
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
