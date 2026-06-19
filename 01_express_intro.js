import express, { json } from "express";

function block_1_basicSercer() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json());

    app.get("/menu", (_, res) => {
      res.status(200).json({
        items: ["thali", "biryani"],
      });
    });

    app.get("/search", (req, res) => {
      const { q, limit } = req.query;
      res.status(200).json({
        query: q,
        limit: limit | 10,
      });
    });

    app.get("/menu/:id", (req, res) => {
      const { id } = req.params;
      res.status(200).json({
        id: id,
        price: 100,
      });
    });

    app.post("/order", (req, res) => {
      const oderd = req.body;
      res.status(200).json({
        status: "created",
        // order,
      });
    });

    const server = app.listen(0, async () => {
      //   console.log("Server content: ", server);
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        const menuRes = await fetch(`${base}/menu`);
        const menuData = await menuRes.json();
        console.log("menu res: ", JSON.stringify(menuData));
        console.log("=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+");

        const searchRes = await fetch(`${base}/search?q=biryani&limit=5`);
        const searchData = await searchRes.json();
        console.log("search res: ", JSON.stringify(searchData));
        console.log("=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+");

        const menuItemRes = await fetch(`${base}/menu/40`);
        const menuItemData = await menuItemRes.json();
        console.log("menuItemData res: ", JSON.stringify(menuItemData));
        console.log("=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+");

        const orderRes = await fetch(`${base}/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dish: "biryani", qty: 2 }),
        });
        const orderData = await orderRes.json();
        console.log("orderData res: ", JSON.stringify(orderData));
        console.log("=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+");
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

function block_2_response() {
  return new Promise((resolve) => {
    const app = express();

    app.get("/text", (req, res) => {
      res.send("hello world");
    });

    app.get("/json", (req, res) => {
      res.json({
        message: "hello world",
      });
    });

    app.get("/not-found", (req, res) => {
      res.status(404).json({
        message: "Page not found",
      });
    });

    app.get("/health", (req, res) => {
      res.sendStatus(200);
    });

    app.get("/old-route", (req, res) => {
      //add entry in DB to see how many old user are vising old route
      res.redirect(301, "/new-route");
    });

    app.get("/xml", (req, res) => {
      res.type("application/xml").send();
    });

    app.get("/custom-header", (req, res) => {
      // for ex. like if premium user request in high priority and free user work in low priority like this
      // CORS, Caching, Trase, Rate-limiting, Custom meta data

      res.set("X-Powered-By", "ChaiCode");
      res.set("X-Request-Id", "ChaiC12345");
      res.json({
        message: "hello world",
      });
    });
  });
}

async function main() {
  await block_1_basicSercer();
  await block_2_response();

  process.exit(0);
}

main();
