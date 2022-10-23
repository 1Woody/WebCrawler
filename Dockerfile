#Dev Stage
FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#Prod Stage
FROM node:16-alpine as production

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD npm run start:prod