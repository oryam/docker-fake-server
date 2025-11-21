# syntax=docker/dockerfile:1
# cf. https://docs.docker.com/get-started/workshop/02_our_app/

FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "server.js"]
EXPOSE 3000