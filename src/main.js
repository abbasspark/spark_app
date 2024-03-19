const app = require("./tools/server");
const { runServer } = require("./tools/server-tools");
const config = require("./config");

let start = async () => {
  const port = config.port
  const { httpServer } = await runServer({
    app,
    port,
    onHTTP() {
      console.log(`HTTP SERVER enabled is online on PORT:${port}`);
    }
  });

  const kill = () => {
    httpServer.close();
    process.exit(0);
  };

  process.on("message", (msg) => {
    if (msg === "death") kill();
  });

  process.on("SIGTERM", kill);
  process.on("SIGINT", kill);
};

module.exports = { start };