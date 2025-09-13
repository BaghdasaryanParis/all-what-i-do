
FROM node:20

WORKDIR /app


COPY package*.json ./
ENV PORT=3000

RUN npm install


COPY . .

CMD ["node","node.js"]

EXPOSE 3000
