FROM node:14 as builder

WORKDIR /home/app

RUN apt-get update && apt-get install -y --force-yes ruby \
  && gem install wlang

RUN npm install -g grunt-cli bower

COPY package.json ./

RUN npm install

COPY bower.json ./

RUN bower -f install --allow-root

COPY . ./

RUN grunt

FROM nginx:alpine

COPY --from=builder /home/app/build/ /usr/share/nginx/html
