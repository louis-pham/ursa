var io = require('socket.io')();

io.set('origins', '*:*');

io.on('connection', function (socket) {
  console.log("Client connected");
  socket.on('add-message', function (data) {
    io.emit('add-message', data);
  });
  socket.on("disconnect", () => console.log("Client disconnected"));
});

module.exports = io;