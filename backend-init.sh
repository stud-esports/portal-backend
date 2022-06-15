#!/bin/bash

while !</dev/tcp/${POSTGRES_HOST}/${POSTGRES_PORT};
    do sleep 5;
done;

npm config set update-notifier false;

TABLE=SequelizeMeta
SQL_EXISTS=$(printf '\dt "%s"' "$TABLE")
echo "Checking if table <$TABLE> exists..."

# using #!/bin/bash
if [[ $(PGPASSWORD="${POSTGRES_PASSWORD}" psql -h "${POSTGRES_HOST}" -U ${POSTGRES_USER} -d ${POSTGRES_DB} -p ${POSTGRES_PORT} -c "$SQL_EXISTS") ]]
then
    echo "Table <$TABLE> exists. Run migrations only..."
    npm run migrate:run-all;
else
    echo "Table <$TABLE> doesn't exist. Run migrations and seeders..."
    npm run migrate:run-all;
    npm run seed:run-all;
fi

echo "Starting app..."
node dist/main.js;
