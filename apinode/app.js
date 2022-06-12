'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const app =  express();
const api = require('./route'); 
var cors = require('cors');

app.use(cors())

app.use(bodyParser.urlencoded({extended : false}));  
app.use(bodyParser.json());
                
app.engine('handlebars', hbs({defaultLayout: 'default'}));

app.set('view engine', 'handlebars'); 

app.use(express.static(__dirname + '/views')); 

app.get('/', (req, res) =>{
  res.render('index')
});

app.use('/api', api);
app.use( express.json());
module.exports = app;
