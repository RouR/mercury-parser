FROM node:16-buster-slim

WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .
EXPOSE 3000
CMD [ "node", "app.js"]
#RUN ls -la
