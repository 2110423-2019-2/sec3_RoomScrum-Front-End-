FROM node:12.14-slim as build

WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN npm set progress=false && \
    npm install --quiet 

# ensure .env exist !
COPY .env . 

COPY . .
RUN npm run build


# copy to static serve
FROM nginx:1.17.10-alpine
WORKDIR /home/node/static
COPY --from=build /home/node/app/build/ /home/node/static

COPY ./nginx/conf.d /etc/nginx/conf.d