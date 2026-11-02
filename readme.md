# magenta

- docker container
- nodejs
- express
- mongodb
- mysql

a simple little api that

1. mongodb serves and preforms crud operations on a collection of user.
2. using mysql prefrom crud operations on a table of movies.


#### Running Locally

```bash

# running
docker compose up --build

# take down with volumes
docker compose down -v

# destructive action, rebuilds afterwards
docker compose down -v && \
rm -rf .mongo .mysql &&  \
echo "rebuilding containers..." && \
docker compose up --build

```

When your within `./app` directory, commands like `npm run fresh` are available.

```bash

# rm -rf ./../.mongo ./../.mysql && docker compose up --build --attach app
npm run fresh

```

```bash

# export collection from mongodb as JSON

docker exec magenta-mongo mongoexport \
--username=${MONGO_USER} \
--password=${MONGO_PASSWORD} \
--authenticationDatabase=admin \
--db=${MONGO_DATABASE}\
--collection=users\
--out=/tmp/export.json\
--jsonArray

# then... copy to host

docker cp magenta-mongo:/tmp/export.json ./mongo-export.json

```
