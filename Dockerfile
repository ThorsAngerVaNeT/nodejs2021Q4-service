FROM alpine
RUN apk add --update npm
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "start" ]