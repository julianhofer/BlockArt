
const { conn } = require('./DBConnection.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const mysql = require('mysql');


// parse application/json
app.use(bodyParser.json());


//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

//show all users
app.get('/api/users', (req, res) => {
    let sql = "SELECT * FROM users";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//show single user by id
app.get('/api/users/:user_id', (req, res) => {
    let sql = "SELECT * FROM users WHERE user_id=" + req.params.user_id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//show single user by pubKey
app.get('/api/users/pubKey/:pubKey', (req, res) => {
    let sql = "SELECT * FROM users WHERE pubKey=" + "'" + req.params.pubKey + "'";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//add new user
app.post('/api/users', (req, res) => {

    let sql = "INSERT INTO users (`firstname`, `lastname`, `email`, `pubKey`, `privKey`) VALUES ('" + req.body.firstname + "', '" + req.body.lastname
        + "', '" + req.body.email + "', '" + req.body.pubKey + "' , MD5('" + req.body.privKey + "') );";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//update user
app.put('/api/users/:user_id', (req, res) => {
    let sql = "UPDATE users SET firstname='" + req.body.firstname + "', lastname='" + req.body.lastname
        + "', email='" + req.body.email + "', privKey= MD5('" + req.body.privKey + "'), pubKey='" + req.body.pubKey + "' WHERE user_id=" + req.params.user_id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//Delete user
app.delete('/api/users/:user_id', (req, res) => {
    let sql = "DELETE FROM users WHERE user_id=" + req.params.user_id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//Server listening
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});