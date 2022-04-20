FROM node:16

WORKDIR /usr/app

COPY . /usr/app

RUN npm install

RUN npm install nodemon -g

EXPOSE 3000

CMD ["nodemon", "-L", "server.js"]