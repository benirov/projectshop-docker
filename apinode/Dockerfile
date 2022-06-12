FROM node

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

CMD mongoimport --host mongo --db shop --collection products --type json --file /init-mongo.json --jsonArray

EXPOSE 5000

CMD ["npm", "run", "dev"]