// server.js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello this is my ssh_key !\n");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// let mysql = require("mysql2");
// let con =  mysql.createConnection({
//   host: process.env.DB_HOST || "mysql",
//   user: process.env.DB_USER || "user",
//   password: process.env.DB_PASSWORD ||  "root",
//   database: process.env.DB_NAME || "db" 
// });
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected to the database!");
// });