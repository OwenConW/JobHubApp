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

let users = []

const addUser = (userId, socketId) => {
  !users.some(u => u.userId === userId) &&
  users.push({userId, socketId})
}

const removeUser = (socketId) => {
  users = users.filter(u => u.socketId !== socketId)
}

const getUser = (receiverId) => {
  return users.find(user => user.userId === receiverId)
}


io.on("connection", socket => {
  console.log("user conected")
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id)
      io.emit("getUsers", users)
    })

    socket.on("sendMessage", ({senderId, receiverId, text}) => {
      const user = getUser(receiverId);
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text
      })
    })

    socket.on("QuitFromChat", (id) => {
      const user = getUser(id)
      removeUser(user?.socketId)
      io.emit("getUsers", users)
    })


    socket.on("disconnect", () => {
      console.log("user disconected")
      removeUser(socket.id)
      io.emit("getUsers", users)
    })
})

module.exports = server;
