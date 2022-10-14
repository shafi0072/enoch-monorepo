FROM node:17.8.0

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .

#RUN npm i yalc -g
#RUN yalc link @elementzerolabs/ui --store-folder /yalc-packages
#RUN yalc link @elementzerolabs/common --store-folder /yalc-packages

CMD ["npm", "run", "start:dev"]