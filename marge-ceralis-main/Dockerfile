FROM node:21-alpine as builder
RUN mkdir /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

#Stage 2
FROM nginx:1.24-alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
COPY /infra/nginx/virtualhost.conf /etc/nginx/conf.d/
COPY /infra/nginx/nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /dist .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]