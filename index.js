const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const { configDotenv } = require("dotenv");

configDotenv.apply();
const app = express();

const PORT = process.env.PORT;
const connectionString = process.env.CONNECTION_STRING;
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
  .connect(connectionString)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on https://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.static(path.join(__dirname, "/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
