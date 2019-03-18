DROP TABLE IF EXISTS "blueLogConfig"; -- fix cache problem when recreating database
CREATE TABLE "blueLogConfig" (
  "version" INT
);

PRAGMA foreign_keys = ON;


