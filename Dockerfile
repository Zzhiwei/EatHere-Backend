FROM amd64/node

WORKDIR /app

ADD dist .

ENV NODE_ENV prod
ENV MONGODB_URI mongodb+srv://CS3219:CS3219@cs3219.znysiko.mongodb.net/?retryWrites=true&w=majority

COPY package*.json ./

RUN npm install 
# RUN npm install pm2 -g

EXPOSE 8080

CMD ["node", "index.js"]




