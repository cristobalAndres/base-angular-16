FROM --platform=linux/amd64 node:18-alpine AS build
WORKDIR /app

ARG ANGULAR_PUBLIC_ENV
ENV ANGULAR_PUBLIC_ENV=$ANGULAR_PUBLIC_ENV

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build -- --configuration $ANGULAR_PUBLIC_ENV

FROM nginx:alpine
COPY --from=build /app/dist/cw-cl-users-web-manager/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80