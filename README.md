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

EXPOSE 3000

CMD [ "npx", "serve", "dist" ]
```

## Docker Compose

- docker-compose.yml

```yml
services:
  api:
    build: ./borrow-app/ # ตำแหน่งของ Dockerfile
    ports:
      - '8080:8080'
    environment:
      NODE_ENV: development
      SERVER_URL: localhost
      # SERVER_URL: 47.129.56.185
      PORT: 8080
      MONGODB_URL: mongodb+srv://root:1234@db.9pid9n4.mongodb.net/
      JWT_SECRET: jwtsecret
    networks:
      - my-network

  web:
    build: ./react-borrow-app/ # ตำแหน่งของ Dockerfile
    ports:
      - '3000:3000'
    environment:
      VITE_API: http://localhost:8080 # URL ของ API สำหรับให้ front-end ติดต่อ (ควรใช้ IP หรือ domain จริงเมื่อ deploy)
      # VITE_API: http://47.129.56.185:8080 # URL ของ API สำหรับให้ front-end ติดต่อ (ควรใช้ IP หรือ domain จริงเมื่อ deploy)
    networks:
      - my-network

networks:
  my-network:
    driver: bridge # ใช้ network ประเภท bridge เพื่อให้คอนเทนเนอร์ต่างๆ สื่อสารกันได้ใน network เดียวกัน
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

$ docker images
$ docker rmi -f <image-id>
```
