// const http = require("http");
// const app = require("./app");
// const { initializeSocket } = require("./socket");
// const port = process.env.PORT || 3000;
// app.set("etag", false);
// const server = http.createServer(app);


// initializeSocket();
// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");

const port = process.env.PORT || 3000;

app.set("etag", false);

const server = http.createServer(app);

initializeSocket(server);   // ✅ important fix

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});