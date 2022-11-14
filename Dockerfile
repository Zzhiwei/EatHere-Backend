FROM amd64/node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY dist .

ENV NODE_ENV prod
ENV MONGODB_URI mongodb+srv://CS3219:CS3219@cs3219.znysiko.mongodb.net/?retryWrites=true&w=majority

EXPOSE 8080

CMD ["node", "index.js"]




