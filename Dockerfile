# build stage
FROM node:lts-alpine AS build-stage
WORKDIR /src
COPY package.json ./
RUN npm install
RUN npm rebuild esbuild
COPY . .
RUN npm run build

# production stage
   FROM nginx:stable-alpine AS production-stage
   COPY --from=build-stage /src/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 8080
   CMD ["nginx", "-g", "daemon off;"]