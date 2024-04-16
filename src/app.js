const express = require("express");
const net = require("net");

const app = express();
const server = net.createServer();
const sockets = [];

app.use(express.json());
server.on("connection", (socket) => {
  console.log("Nueva conexión TCP");
  sockets.push(socket);

  socket.on("data", (data) => {
    console.log(`Recibimos datos desde el cliente: ${data.toString()}`);
  });

  socket.on("end", () => {
    console.log("Conexión TCP cerrada");
    sockets.splice(sockets.indexOf(socket), 1);
  });

  socket.on("error", (err) => {
    console.error(`Error en la conexión TCP: ${err}`);
  });
});

server.listen(3000, () => {
  console.log("Servidor TCP iniciado en el puerto 3000");
});
// ---------------------------------------------------------------------------------------------
app.get("/send", (req, res) => {
  const { data } = req.body;
  console.log("Enviando datos a las conexiones TCP");
  sockets.forEach((socket) => {
    socket.write(data.toString());
  });
  res.send("Datos enviados a las conexiones TCP");
});

app.get("/query", (req, res) => {
  const { data } = req.query; // Obtén el parámetro de consulta llamado "data"
  console.log("Enviando datos a las conexiones TCP");
  sockets.forEach((socket) => {
    socket.write(data.toString());
  });
  res.send("Datos enviados a las conexiones TCP");
});


app.listen(4000, () => {
  console.log("Aplicación Express iniciada en el puerto 4000");
});
