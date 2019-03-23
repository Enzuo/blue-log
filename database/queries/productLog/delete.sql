DELETE FROM "ProductLog"
WHERE "idLog" = {{= ids }}
;

DELETE FROM "Log"
WHERE "id" = {{= ids }}
;

