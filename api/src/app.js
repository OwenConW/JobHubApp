const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const socketio = require('socket.io');
const http = require("http");
require('./db.js');

const app = express();




app.name = 'API';

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', routes);

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        methods: ["GET", "POST"]
    }
});

io.on("connection", socket => {
  let nombre;
  socket.on("conectado", (name) => {
    nombre = name
    console.log(`Usuario ${nombre} conectado con exito.`)
      socket.broadcast.emit("mensajes", {nombre: "Servidor", mensaje: `${nombre} ha entrado en la sala`})
  })
  socket.on("mensaje", (nombre, mensaje) => {
      console.log({nombre, mensaje})
      io.emit("mensajes", {nombre, mensaje});
  })
  socket.on("disconnect", () => {
      io.emit("mensajes", {nombre: "Servidor", mensaje: `${nombre} ha abandonado la sala `})
  })
})


module.exports = server;
