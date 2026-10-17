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

# the first run...
docker compose up --build

# rebuilds afterwards (assumes path is project root)
rm -rf .mongo && docker compose up --build

# compelete rebuild (likely overkill)
rm -rf .mongo .mysql && docker stop $(docker ps -aq) && docker rm $(docker ps -aq) && docker compose down -v && docker compose up --build

```

if you work out of `./app` directory then commands like `npm run fresh` are available
