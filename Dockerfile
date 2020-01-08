FROM node:7.3
MAINTAINER Echo Gregor "nta@mindseyesociety.org"

RUN npm install -g nodemon knex forever

EXPOSE 3000
EXPOSE 3030

ADD . /app

WORKDIR /app

RUN npm install

CMD forever app.js
