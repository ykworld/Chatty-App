const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '127.0.0.1', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.broadcast({type:"incomingCount", count: wss.clients.size});
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.broadcast({type:"incomingCount", count: wss.clients.size});
    console.log('Client disconnected');
  });

  ws.on('message', (data) => {
    let message = JSON.parse(data);
    switch(message.type) {
      case "postMessage":
        message.type = "incomingMessage";
        break;
      case "postNotification":
        message.type = "incomingNotification";
        break;
      default:
        break;
    }
    data = Object.assign({}, {id: uuidv1()}, message);
    wss.broadcast(data);
  });
});

wss.broadcast = (data) => {
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(data));
  });
};
