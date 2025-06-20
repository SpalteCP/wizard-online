const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

io.on("connection", (socket) => {
  console.log("Ein Spieler ist verbunden:", socket.id);

  socket.on("disconnect", () => {
    console.log("Spieler hat verlassen:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
