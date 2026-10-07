# Node.js + MongoDB (Docker Compose, development)

Development environment. Source is edited on the host and executed in the container.

## Layout

```txt
.
├── App                 # Node.js app (bind-mounted into the container)
├── Data                # MongoDB data files (bind mount, persists across restarts)
├── .env                # Variables consumed by docker-compose.yml
├── docker-compose.yml  # Defines the two services
├── Dockerfile          # Builds the app image (dependencies only)
└── init-mongo.js       # Seed data, runs once on first DB start
```

## How it works

- `Dockerfile` builds an image containing Node and installed dependencies. No source is baked in.
- `docker-compose.yml` runs two containers on a shared network:
  - `app`: mounts `./App` at `/usr/src/app`, runs `node --watch --inspect`. Saving a file restarts the process. Reaches the database at hostname `mongo`.
  - `mongo`: official image. Stores data in `./Data`. Runs `init-mongo.js` only when `Data/` is empty.
- `node_modules` lives in a named Docker volume, not on the host.
- `app` starts only after the `mongo` healthcheck passes.
- `.env` supplies versions, ports, and credentials.

## Setup

```bash
cp .env.example .env   # edit values as needed
```

## Commands

```bash
docker compose up --build        # build and start (foreground)
docker compose up -d --build     # build and start (background)
docker compose logs -f app       # follow app logs
docker compose ps                # list project containers
docker compose down              # stop and remove containers and network
docker compose down -v           # also remove the node_modules volume
docker compose down --rmi local  # also remove the built app image
```

Working inside the container:

```bash
docker compose exec app sh                 # shell in the app container
docker compose exec app npm install <pkg>  # add a dependency (updates App/package.json)
docker compose exec app npm install        # sync modules after package.json changed on host
docker compose restart app                 # restart without rebuilding
```

Debugging: attach a Node debugger to `localhost:9229` (VS Code config in `.vscode/launch.json`).

Verify:

```bash
curl localhost:3000
docker compose exec mongo mongosh -u root -p example --authenticationDatabase admin appdb --eval "db.users.find()"
```

Reseed (destroys all data):

```bash
docker compose down
rm -rf Data/*
docker compose up
```

## Docker CLI reference

Docker has images (templates) and containers (running instances of images).

```bash
docker ps                  # running containers
docker ps -a               # all containers, including stopped
docker ps -aq              # container IDs only
docker images              # local images
docker volume ls           # volumes
docker logs -f <name>      # follow container logs
docker exec -it <name> sh  # shell into a running container
docker stop <name>         # graceful stop
docker rm <name>           # remove stopped container
docker rm -f <name>        # stop and remove
docker rmi <image>         # remove image
```

Bulk operations (affect every project on the machine):

```bash
# bash/zsh
docker rm -f $(docker ps -aq)

# PowerShell
docker rm -f (docker ps -aq)

docker container prune     # remove all stopped containers
docker image prune -a      # remove all unused images
docker system prune        # remove stopped containers, unused networks, dangling images
```

`docker compose` commands act only on this project; plain `docker` commands act on everything.