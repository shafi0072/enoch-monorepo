FROM node:17.8.0

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# To copy hbs template in dist folder
RUN npm run build

CMD ["npm", "run", "start:dev"]