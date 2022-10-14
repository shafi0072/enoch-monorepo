# How to setup

Now you need to spin NATs server, MongoDB, Redis server

There are 2 ways to do the same.
1. Use `docker-compose.common.yml` to spin all services by single command.
2. Spin those containers manually one by one.

## Use docker-compose to spin all services
```bash
docker-compose -f docker-compose.common.yml up -d
``` 

## Spin containers manually
Now you need to run NATs server.

```bash
$ docker run -d --rm --name=jst -p 4222:4222 nats-streaming:0.17.0  -hbi 5s -hbt 5s -hbf 2 -SD -cid enoch
```

Now you need to run Redis server.

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

# Important

Some times `npm run start:dev` may fail to run
in that case,

For windows run,
```bash
$ npm run start:dev
```

For windows mac/linux,
```bash
$ npm run start:dev
```

You may run in an error while runing ELK stack.

```bash
sudo sysctl -w vm.max_map_count=262144
```
# docker-compose -f docker-compose.production.yml up

# Setup local microservices with ELK stack
```bash
docker-compose -f docker-compose.elk.yml -f docker-compose.yml build
```

```bash
docker-compose -f docker-compose.elk.yml -f docker-compose.yml up -d
```

username: elastic
password: changeme