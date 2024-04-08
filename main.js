//Imports
const path = require("path");
const express = require("express");
const connection = require("./src/database/conection.js");

//Variaveis
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//Configurações do servidor
app.use(express.static(path.join(__dirname, "src/public")));
app.set("views", path.join(__dirname, "src/public"));
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'html');

//Chat
app.use("/", (req, res) => {
res.render("index.html")
})

let messages = []

//Conexão com socket.io
io.on("connection", socket => {
console.log(`New socket: ${socket.id}`)
socket.emit('previousMessages', messages)
socket.on('sendMessage', data => {
messages.push(data)
socket.broadcast.emit("receivedMessage", data)
})
})

// Iniciando o servidor
server.listen(3000, async data => {
console.log(`Servidor iniciado`)
})
