FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

RUN npm run build
RUN npm run seed
CMD ["npm", "run", "start:prod"]