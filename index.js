const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Domba123!',
    database:'Tutorials',
    waitForConnections: true,
    connectionLimit : 10,
    queueLimit : 0
})


var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/tutorial', (req, res) => {
    pool.query('SELECT * FROM tutorial', (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  });
  app.post('/tutorial', (req, res) => {
    const { title, description } = req.body;
    pool.query(
      'INSERT INTO tutorial (title, description) VALUES (?, ?)',
      [title, description],
      (error, results, fields) => {
        if (error) throw error;
        res.status(201).json({ message: 'things added successfully' });
      }
    );
  });



app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from Express server!"}); 
})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));