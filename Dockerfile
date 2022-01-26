FROM node:16.13-alpine
EXPOSE ${PORT}
WORKDIR /usr/app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
WORKDIR /usr/app/trello-nestjs
CMD ["npm","run","start:dev"]