const io = require("socket.io")();
const socketapi = {
    io: io
};

var ids = [];
var idnames = [];
io.on("connection", function(socket) {

    console.log("A user connected", socket.id, socket.username);
    ids.push(socket.id);
    io.emit('ids', idnames); //Showing online users

    socket.on('msg', (data) => {
        socket.broadcast.emit('reply', data);
    });

    socket.on('bhejdonaam', (data) => {
        idnames.push(data);
        io.emit("naam", idnames);
    })

    socket.on('disconnect', () => {
        console.log("disconnect");
        var index = ids.indexOf(socket.id);
        ids.splice(index, 1);
        idnames.splice(index, 1);
        io.emit('ids', idnames);
        io.emit("naam", idnames);
    });

    socket.on('typingg', (data) => {
        socket.broadcast.emit("t", data);
    })


});

module.exports = socketapi;