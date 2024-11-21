FROM node:18-alpine


WORKDIR /usr/ASBackend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8888

CMD ["npm", "start"]
