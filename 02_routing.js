import express, { json } from "express";

function block_1_basicSercer() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json());

    const routes = {
      1: {
        id: 1,
        name: "First bus",
        direction: "North",
      },
      2: {
        id: 2,
        name: "Second bus",
        direction: "South",
      },
    };

    let nextID = 3;
    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        // Get all buses list
        app.get("/routes", (req, res) => {
          res.json({
            data: Object.values(routes),
          });
        });

        // Single route by id
        app.get("/routes/:id", (req, res) => {
          const { id } = req.params;
          const route = routes[id];

          if (!route)
            return res.status(404).json({
              error: "No data found!",
            });

          res.json({ data: route });
        });

        app.post("/routes", (req, res) => {
          //   const { name, direction } = req.body;
          const newRoute = { id: nextID++, ...req.body };
          routes[newRoute.id] = newRoute;

          res.status(201).json({ data: newRoute.id[values] });
        });

        app.put("/routes:/id", (req, res) => {
          const { id } = req.params.id;

          routes[id] = { id: Number(id), ...req.body };
          res.status(200).json({ data: routes[id] });
        });

        app.delete("/routes:/id", (req, res) => {
          const { id } = req.params.id;

          delete routes[id];
          res.status(200).json({ data: "Deleted" });
        });
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

function block_2_NewRoutes() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json());

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://127.0.0.1:${port}`;

      try {
        // /files/docs/file1.txt
        app.get("/files/*filepath", (req, res) => {
          // Direct access file - in Express 5
          const filePath = req.params.filepath;

          res.json({
            data: filePath,
            type: "wildcard",
          });
        });

        // New way
        app.route("/schedule").get(showData);

        // Prefetch
        app.use("/api", (req, res) => {
          // prefetch before call any API
        });
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

async function showData() {}

async function main() {
  await block_1_basicSercer();

  process.exit(0);
}

main();
