const { Console } = require("console");

const app=require("express")();
//The first line imports the Express module and assigns it to the variable app.

const server = require ('http').createServer(app)
//The second line creates an HTTP server using the createServer method from the built-in http module, 
//passing in the app as an argument. This sets up the server to handle HTTP requests using Express.

const io = require("socket.io")(server,{
    cors:{
        origin:"*",
    }
})
//The third line initializes Socket.IO by passing the server object created in the previous step and 
//an empty object (which can be used for configuration options) to the socket.io function.
// This enables real-time bidirectional communication between the server and clients.

io.on("connection",(socket)=>{
    console.log("WHAT IS SOCKETS" , socket)  // Log the socket object when a new client connects
    console.log("socket connected") // Log a message indicating that a new socket connection is established

    // Listen for 'chat' events from the client
    socket.on('chat',(payload)=>{
        console.log("what is payload" , payload) // Log the received payload from the client
        io.emit('chat',payload) // Emit the 'chat' event to all connected clients, including the sender
    })
})

server.listen(5000,()=>{
    console.log('server is listening on port ',5000)
})