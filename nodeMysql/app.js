const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'user',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'mydb'
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к MySQL:', err.stack);
    return;
  }
  console.log('Успешное подключение к MySQL');
});


app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

app.listen(port, () => {
  console.log(`Приложение запущено на http://localhost:${port}`);
});