FROM node:16-buster-slim

COPY . .
#WORKDIR mercury-parser
RUN yarn install
EXPOSE 3000
#CMD [ "yarn", "serve", "--port", "3000", "--host", "0.0.0.0" ]
CMD [ "node", "app.js"]
#RUN ls -la