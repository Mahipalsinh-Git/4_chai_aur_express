import express, { json } from "express";

function block_1_Middleware() {
  return new Promise((resolve) => {
    const app = express();
    app.use(express.json({ limit: "50kb" })); // means json-payload size below 50kb
    app.use(express.urlencoded({ extended: true })); // extended for if nested data content encoded
    app.use(
      express.static(root, {
        dotfiles: "ignore",
        maxAge: 0, // for cache control
      }),
    );

    const logs = [];

    // Build-in Custom request logger Middleware
    app.use((req, res, next) => {
      // Business logic
      // ex. Add to DB, Console log everything, Authticate user
      const logEntry = `${req.method} : ${req.url}`;
      logs.push(logEntry);

      // if next() is missed then your request is hang forever
      next();
    });

    app.use((req, res, next) => {
      req.startTime = Date.now();

      res.on("finish", () => {
        const duration = Date.now() - req.startTime;
        console.log(`[Timer] - ${req.method} - ${req.url} took ${duration}ms`);
      });

      next();
    });

    // Fully custom middleware
    function authMe(req, res, next) {
      const token = req.headers["x-auth-token"];

      if (!token) {
        return res.status(401).json({ error: "No token, please login" });
      }

      if (token !== "secret-chaicode") {
        return res.status(403).json({
          error: "Invalid token",
        });
      }

      // Token -> extract data from token -> UserID - fetch from DB and added into current request
      req.user = { id: 1, name: "mahipal", role: "admin" };

      next();
    }

    function getRole(role) {
      return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
          return res.status(403).json({ error: `Role ${role} required` });
        }
      };
    }

    function rateLimit(maxRequest) {
      let count = 0;

      return (req, res, next) => {
        count++;

        if (count > maxRequest) {
          return res
            .status(429)
            .json({ error: "Too many request, please try after sometime" });
        }

        next();
      };
    }

    const limitedEndPoint = rateLimit(3);
    app.get("/limited", limitedEndPoint, (req, res) => {});

    // now used custom header
    app.get("/profile", authMe, getRole("admin"), another, () => {});
    app.get("/profile", authMe, getRole("teacher"), another, () => {});
    app.get("/profile", authMe, getRole("student"), another, () => {});

    const server = app.listen(0, async () => {
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
