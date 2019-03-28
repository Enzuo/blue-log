DELETE FROM "ProductLog"
WHERE "idLog" IN( {{= ids }} )
;

DELETE FROM "Log"
WHERE "id" IN( {{= ids }} )
;

