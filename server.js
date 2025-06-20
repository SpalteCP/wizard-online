const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Statische Dateien aus dem "public"-Ordner ausliefern
app.use(express.static(path.join(__dirname, "public")));

// Alle Anfragen mit index.html beantworten (Single Page App)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {
  console.log("Ein Spieler ist verbunden:", socket.id);

  socket.on("disconnect", () => {
    console.log("Spieler hat verlassen:", socket.id);
  });

  socket.on("playCard", (card) => {
    console.log(`Spieler ${socket.id} hat Karte gespielt: ${card}`);
    // An alle anderen Spieler senden, dass eine Karte gespielt wurde
    socket.broadcast.emit("cardPlayed", { player: socket.id, card });
  });
});

server.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
