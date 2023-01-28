FROM node:lts-alpine as final_node

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock   ./
RUN yarn install
COPY . .
RUN yarn build

EXPOSE 7002
CMD ["node","./dist/index.js"]
