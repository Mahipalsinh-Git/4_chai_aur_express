import express, { json } from "express";

function block_1_basicSercer() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json());

    const server = app.listen(0, async () => {
      //   console.log("Server content: ", server);
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
      } catch (error) {
        console.log("Error: ", error);
      }

      server.close(() => {
        console.log("Block 1 served....");
        resolve();
      });
    });
  });
}

async function main() {
  await block_1_basicSercer();

  process.exit(0);
}

main();
