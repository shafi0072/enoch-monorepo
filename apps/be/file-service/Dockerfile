FROM node:17.8.0

ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

RUN rm -f .npmrc

CMD ["npm", "run", "start:dev"]