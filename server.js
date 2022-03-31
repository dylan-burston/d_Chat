const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');
const http = require('http')
const socketIO = require('socket.io');

require('dotenv').config();
require('./config/database');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors())

let activeUsers = [];

const newUser = (userId, socketId) => {
  if (!activeUsers.some(user => user.userId === userId)) {
    activeUsers.push({userId: userId, socketId: socketId})
  } 
}

const delUser = (socketId) => {
  activeUsers = activeUsers.filter(user => user.socketId !== socketId)
}

const fetchUser = (userId) => {
  return activeUsers.find(user => user.userId == userId)
}

io.on("connection", (socket) => {

  socket.on("send_user", userId => {
    newUser(userId, socket.id)
    console.log("active users are", activeUsers)
    io.emit("get_users", activeUsers)
  })

  socket.on("send_message", ({senderId, receiverId, content}) => {
    const rec = fetchUser(receiverId);
    if (rec) {
      io.to(rec.socketId).emit("get_message", {
          senderId: senderId,
          receiverId: receiverId,
          content: content,
      })
    }
  })

  socket.on("disconnect", () => {
    delUser(socket.id)
    io.emit("get_users", activeUsers)
  })

})

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/auth'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/messages', require('./routes/api/messages'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

server.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});