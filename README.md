# Anonymous Chat

## Running backend

_Requirements:_

- [Docker & docker-compose installed](https://docs.docker.com/compose/install/)

### Ho to run backend

1. Navigate to `Backend` folder

```shell
cd ./Backend
```

2. Compose backend services

```shell
docker compose up --build
```

3. Stop composed backend

_This will stop backend services. To run them again, use command from point 2, build without_ `--build` _flag._

```shell
docker compose stop
```

4. Restart backend

```shell
docker compose restart
```
