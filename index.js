const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Domba123!',
  database: 'Tutorials',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/tutorials', (req, res) => {
  pool.query('SELECT * FROM tutorial', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/tutorials/:id', (req, res) => {
  pool.query(`SELECT * FROM tutorial WHERE id = ${req.params.id}`, (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/tutorials', (req, res) => {
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

app.delete('/tutorials/:id', (req, res) => {
  const deleteId = req.params.id
  pool.query(`DELETE FROM tutorial WHERE id = ${deleteId}`,
    (error, results, fields) => {
      if (error) throw error;
      res.status(201).json({ message: 'things deleted successfully' });
    }
  )
})
app.patch('/tutorials/:id', (req, res) => {
 const patchId = req.params.id;
 const { editedTitle, editedDescription } = req.body
 pool.query(`UPDATE tutorial SET title = ${editedTitle}, description = ${editedDescription} WHERE id = ${patchId}`)
})

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from Express server!" });
})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));