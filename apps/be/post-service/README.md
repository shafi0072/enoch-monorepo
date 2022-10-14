# How to create migration
## Create a migration
npm run typeorm -- migration:create -n AddUsers
## Create an entity in /src/db/entities


# How to run migration
npm run typeorm -- migration:run

# How to revert migration 
npm run typeorm -- migration:revert

This command will execute down in the latest executed migration. If you need to revert multiple migrations you must call this command multiple times.

# This application has dependency on NATs server, MongoDB and Redis

## Spin all services at using docker-compose
```bash
docker-compose -f docker-compose.common.yml up -d
```

## Spin containers individually

You need to run NATs server.

```bash
$ docker run -d --rm --name=jst -p 4222:4222 nats-streaming:0.17.0  -hbi 5s -hbt 5s -hbf 2 -SD -cid enoch
```

You need to run Redis server.

```bash
$ docker run -d --rm --name=redis-graphql -p 6379:6379 -v ${pwd}/data/redis:/data redis:latest
```

And you also need to spin mongo docker,

```bash
$ docker run -d --rm --name=mongodb -p 27017:27017 mongo
```

update .env in each apps/
```.env
NATS_CONNECTION_URL=nats://localhost:4222
MONGO_CONNECTION_URI=mongodb://localhost:27017
REDIS_GRAPHQL_CONNECTION_URL=redis://localhost:6379
```