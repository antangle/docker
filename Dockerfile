FROM node:16
WORKDIR /usr/app
COPY . /usr/app
RUN npm install

EXPOSE 3000
RUN npm install pm2 -g
CMD ["npm", "run", "start"]