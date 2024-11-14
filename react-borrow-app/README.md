# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Build

- testing in local

```sh
npm ci
npm run build
npx serve dist
```

- delete a folder name "dist"
- delete a folder name "mode_modules"

## Upload - Docker Hub

- create a repository name "reactjs-borrow-app"
- "jayjakkrit/reactjs-borrow-app"

```sh
docker build -t jayrjakkrit/reactjs-borrow-app:0.1 .
docker run -d -p 3000:3000 --name reactjs-borrow-app jayrjakkrit/reactjs-borrow-app:0.1

docker push jayrjakkrit/reactjs-borrow-app:0.1
```

## Download - Docker Hub

```sh
docker pull jayrjakkrit/reactjs-borrow-app:0.1
docker run -d -p 3000:3000 --name reactjs-borrow-app jayrjakkrit/reactjs-borrow-app:0.1
```
