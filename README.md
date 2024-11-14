## Dockerfile

- Node.js

```Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]
```

- React.jsx

```Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*json ./

RUN npm ci

COPY . .

RUN npm run build

CMD [ "npx", "serve", "dist" ]
```

## Docker Compose

- docker-compose.yml

```yml
services:
  mongo:
    image: mongo:latest
    restart: always
    ports:
      - '27017:27017'
    networks:
      - my-network
    environment:
      MONGO_INITDB_DATABASE: db1

  api:
    build: ./borrow-app/
    ports:
      - '8080:8080'
    depends_on:
      - db
    environment:
      PORT: 8080
      MONGODB_URL: mongodb://mongo:27017/db1 # เปลี่ยน localhost เป็นชื่อ service "mongo"
    networks:
      - my-network

  web:
    build: ./reactjs-borrowapp/
    ports:
      - '5173:5173'
    environment:
      VITE_API: http://3.0.102.101:8080
    networks:
      - my-network

networks:
  my-network:
    driver: bridge
```

## Run Docker Compose

```sh
$ docker --version
$ docker compose up

$ docker compose up -d # Processing in Background
$ docker ps
```

## Build Docker Compose

```sh
$ docker compose up -d

$ docker ps

$ docker compose down
$ docker compose up -d
```
