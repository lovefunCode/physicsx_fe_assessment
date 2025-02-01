import express from "express";
import cors from "cors";

const data = await import("./data.json", { assert: { type: "json"}});

const app = express();
const port = 5001;

const { grid: gridData, iterations: iterationsData} = data.default[0];

app.use(cors());

// API endpoint to get the grid data
app.get("/api/grid", (req, res) => {
  res.json({ grid: gridData });
});

// API endpoint to get the iteration steps
app.get("/api/iterations", (req, res) => {
  res.json({iterations: iterationsData});
});

// Start the server on port 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

