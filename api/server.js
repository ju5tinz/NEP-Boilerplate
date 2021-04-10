#!/usr/bin/env node
require('dotenv').config()

const express = require('express');
const http = require('http');

const app = express();
const db = require('./db')
const passport = require('passport')

require('./config/passport')(passport, db)
require('./config/express')(app, passport, db)
require('./config/routes')(app, passport)

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || 3001;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('close', onClose)

function onClose() {
  db.pool.end()
}
