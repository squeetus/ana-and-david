const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// instruct the database to connect, create, and seed
db.connect();

// ensure we can call this api from another port
app.use(cors());
// ensure express can parse json
app.use(express.json());

/*
  API Endpoint /getAllTodos
  method: GET
  returns a JSON array of Todo Objects
*/
app.get('/getAllTodos', (req, res) => {
  todos = db.getAllTodos((err, todos) => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.json(todos);
    }
  });
});

/*
  API Endpoint /addTodo
  method: POST
  returns 200 OK if completed, 500 if errors occur
*/
app.post('/addTodo', (req, res) => {
  todo = db.addTodo(req.body, (err, result) => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).json({'message': `successfully added ${result.affectedRows} todo with id ${result.insertId}.`});
    }
  });
});


/*
  API Endpoint /markDone
  method: PUT
  returns 200 OK if completed, 500 if errors occur
*/
app.put('/markDone', (req, res) => {
  todo = db.markDone(req.body, (err, result) => {
    if(err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).json({'message': `successfully updated ${result.affectedRows} todo with id ${req.body.id}.`});
    }
  });
});

/*
  Default endpoint
  method: GET
*/
app.get('*', (req, res) => {
  res.statusCode = 200;
  res.setHeader('content-type', 'text/plain');
  res.end("David is hot, Ana is hotter; she likes him a lot, he likes her a lotter");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}/`);
});
