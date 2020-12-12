FROM node:14-alpine

RUN mkdir /usr/app
WORKDIR /usr/app
ADD . /usr/app
RUN npm install
EXPOSE 8080

CMD ["npm", "run", "serve"]
