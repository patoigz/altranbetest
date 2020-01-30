FROM node:alpine

WORKDIR /var/www/server

RUN npm install nodemon -g

EXPOSE 3000

CMD ["npm", "start"]