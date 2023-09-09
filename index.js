"use strict";

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let users = [];

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("send-nickname", (nickname) => {
    socket.nickname = nickname;
    console.log("index.js nick: ", nickname);

    const user = {
      nickname: nickname,
      id: socket.id,
    };

    users.push(user);
    console.log("users: ", users);
    io.emit("new user", users);
  });

  socket.on("join-room", (roomName, cb) => {
    socket.join(roomName);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });

  socket.on("chat message", (msg) => {
    console.log("message: ", msg);
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on port 3000");
});
