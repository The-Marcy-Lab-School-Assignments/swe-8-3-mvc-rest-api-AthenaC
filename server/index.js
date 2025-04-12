const express = require("express");
const path = require("path");

const {
  serveSongs,
  serveSong,
  createSong,
  updateSong,
  deleteSong,
} = require("./controllers/songControllers");

const app = express();
const pathToFrontendDist = path.join(__dirname, "../app/dist");

// Middleware
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  req.time = time;
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToFrontendDist);

const parseJSON = express.json();

app.use(logRoutes); // Print out every incoming request
app.use(serveStatic); // Serve static public/ content
app.use(parseJSON); // Parses request body JSON

// Endpoints
app.get("/api/songs", serveSongs);
app.get("/api/songs/:id", serveSong);
app.post("/api/songs", createSong);
app.patch("/api/songs/:id", updateSong);
app.delete("/api/songs/:id", deleteSong);

// app.get("*", (req, res, next) => {
//   if (req.originalUrl.startsWith("/api")) return next();
//   res.sendFile(pathToFrontendDist);
// });

const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
