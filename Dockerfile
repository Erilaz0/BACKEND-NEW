FROM node:20.9.0

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY ./src ./src

EXPOSE 8080

CMD ["npm","start","-D MONGO","-E production"]