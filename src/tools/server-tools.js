const http = require("http");

async function createServer(app) {

  const httpServer = http.createServer(app);

  return { httpServer };
}

async function runServer({
  app = undefined,
  port = 8081,
  onHTTP = () => { },
} = {}) {

  const { httpServer } = await createServer(app);
  httpServer.listen(port, onHTTP);

  return { httpServer };
}

module.exports = {
  createServer,
  runServer,
};