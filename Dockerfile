FROM node:18-alpine

EXPOSE 8081
WORKDIR /app

COPY ./client ./client
COPY ./server ./server

RUN cd server && npm install
RUN cd client && npm install --force && npm run build
WORKDIR /app/server

CMD ["npm", "run", "serve"]
