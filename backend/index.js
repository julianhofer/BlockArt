
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