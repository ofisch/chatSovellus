"use strict";

// Server URL below must point to your server, localhost works for local development/testing
const socket = io("http://localhost:3000");

const messageBox = document.getElementById("m");
messageBox.hidden = true;
const sendButton = document.getElementById("send");
sendButton.hidden = true;

const enterNicknameForm = document.getElementById("enter-nickname");

document
  .getElementById("enter-nickname")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const nicknameInput = document.getElementById("nickname");
    console.log("nick: ", nicknameInput.value);
    socket.emit("send-nickname", nicknameInput.value);
    //socket.emit("sendNickname", nickname);

    enterNicknameForm.hidden = true;

    messageBox.hidden = false;
    sendButton.hidden = false;
  });

document.getElementById("send-message").addEventListener("submit", (event) => {
  event.preventDefault();

  const inp = document.getElementById("m");
  socket.emit("chat message", nickname.value + ":" + inp.value);
  inp.value = "";
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.innerHTML = msg;
  document.getElementById("messages").appendChild(item);
});
