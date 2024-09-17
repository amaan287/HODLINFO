const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.get("/api/tickers", async (req, res) => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");

    res.json(response.data); // Send the data to the client-side
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.l5whg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, () => {
  console.log(`app running on https://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, "/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
