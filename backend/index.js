const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

let taxiSocket = null;
let passengerSocket = null;

io.on("connection", socket => {
  console.log("a user connected !");
  socket.on("taxiRequest", taxiRoute => {
    passengerSocket = socket;
    console.log("someone is looking for a taxi");
    if (taxiSocket != null) {
      taxiSocket.emit("taxiRequest", taxiRoute);
    }
  });
  socket.on("driverLocation", driverLocation => {
    passengerSocket.emit("driverLocation", driverLocation);
  });
  socket.on("lookingForPassenger", () => {
    console.log("Someone is looking for a passenger");
    taxiSocket = socket;
  });
});

server.listen(port, () => console.log("server running on port:" + port));
