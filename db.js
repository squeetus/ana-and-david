const mysql = require('mysql2');

let pool;
let connection;

// command to create the song database and song table schema once
let createCommand = `
  DROP TABLE IF EXISTS todo;
  CREATE TABLE todo (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    what varchar(255) NOT NULL,
    category varchar(100) NOT NULL,
    who varchar(100) NOT NULL,
    done varchar(1) NOT NULL,
    whence DATETIME NOT NULL,
    created DATETIME NOT NULL
  );
  `

let seedCommand = `
  INSERT INTO todo (what, category, who, done, whence, created)
  VALUES
    ('Wish Ana happy birthday!', 'todo', 'David', 'N', '2021-09-09 00:01:01','`+new Date().toISOString().slice(0, 19).replace('T', ' ')+`')
  ;
  `

let params = {
  host     : process.env.CLEARDB_HOST || 'localhost',
  user     : process.env.CLEARDB_USER || 'todotest',
  password : process.env.CLEARDB_PASS || 'test',
  multipleStatements: true,
  dateStrings: true,
  timezone: '+00:00'
}

// prod
if(process.env.CLEARDB_DATABASE_URL) {
  params.database = process.env.CLEARDB_DB;

  // local
} else {
  mysql.createConnection(params).query(`CREATE DATABASE IF NOT EXISTS todo_list;`, (err, result) => {
    if(err) throw('unable to execute query: ' + err.stack);
    console.log('database created');
  });
  params.database = 'todo_list';
}

  /*
    Connect to the database described in the params
    Run commands to drop/create the table and seed data
  */
  exports.connect = () => {
    connection = mysql.createConnection(params);

    connection.query(createCommand, (err, result) => {
      if(err) throw('unable to execute query: ' + err.stack);
      console.log('table created');
    });

    connection.query(seedCommand, (err, result) => {
      if(err) throw('unable to execute query: ' + err.stack);
      console.log('todos seeded');
    });

    connection.on('error', (err) => {
      console.log('connection error:', err);
    });
    connection.end();

    pool = mysql.createPool(params);
    pool.on('error', (err) => {
      console.log('pool error:', err);
    });
}

/*
  Get all the todos from the database
  pass the resultant array and any errors to the callback function
*/
exports.getAllTodos = (cb) => {
  pool.getConnection(function(error, connection) {
    connection.query("SELECT * FROM todo", (err, result) => cb(err, result));
    connection.release();
    if (error) throw error;
  });
}

/*
  Add a new todo to the database using a prepared statement
  pass the result and any errors to the callback function
*/
exports.addTodo = (todo, cb) => {
  pool.getConnection(function(error, connection) {
    connection.execute(
      "INSERT INTO todo (what, category, who, whence, done, created) VALUES (?, ?, ?, ?, ?, ?)",
      [todo.what, todo.category, todo.who, todo.whence, todo.done, new Date().toISOString().slice(0, 19).replace('T', ' ')],
      (err, result) => cb(err, result)
    );
    connection.release();
    if (error) throw error;
  });
}

/*
  Update todo in the database using a prepared statement
  pass the result and any errors to the callback function
*/
exports.markDone = (todo, cb) => {
  pool.getConnection(function(error, connection) {
    connection.execute(
      "UPDATE todo SET done=? WHERE id=?",
      [invert(todo.done.toUpperCase()), todo.id],
      (err, result) => cb(err, result)
    );
    connection.release();
    if (error) throw error;
  });
}

function invert(done) {
  if(done == 'Y') {
    return 'N';
  } else if(done == 'N') {
    return 'Y';
  } else {
    return 'X';
  }
}

// /*
//   Delete a song in the database using a prepared statement
//   pass the result and any errors to the callback function
// */
// exports.delete = (id, cb) => {
//   pool.getConnection(function(error, connection) {
//     connection.execute(
//       "DELETE from song WHERE id=?",
//       [id],
//       (err, result) => cb(err, result)
//     );
//     connection.release();
//     if (error) throw error;
//   });
// }
