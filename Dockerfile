FROM node:12.11.1-alpine

WORKDIR /var/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run compile

CMD ["npm","start"]