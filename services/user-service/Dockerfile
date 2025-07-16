FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache bash

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh ./wait-for-it.sh
RUN chmod +x ./wait-for-it.sh

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3002

CMD ["./wait-for-it.sh", "postgres:5432", "--", "npm", "start"]

