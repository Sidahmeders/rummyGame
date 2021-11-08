FROM node:ubuntu
COPY . /rummyApp
WORKDIR /rummyApp
CMD node server.js