FROM node:8.10

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD npm run start

EXPOSE 8081
