FROM debian:jessie

WORKDIR /openlmis-example-ui

COPY package.json .
COPY bower.json .
COPY config.json .
COPY src/ ./src/
