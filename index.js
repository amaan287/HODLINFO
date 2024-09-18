const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const Ticker = require("./model");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const connectionString = process.env.CONNECTION_STRING;
const PORT = process.env.PORt;
// Connect to MongoDB
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(cors()); // Enable CORS to allow frontend requests

// Route to fetch data from the API and save it to the database
app.get("/api/fetch-tickers", async (req, res) => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const data = Object.values(response.data).filter(
      (ticker) => ticker.quote_unit === "inr"
    );

    // Save each ticker to the database
    const savedTickers = await Ticker.insertMany(data);

    res.json(savedTickers); // Send the saved data back as a response
  } catch (error) {
    console.error("Failed to fetch data", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Route to get tickers from the database
app.get("/api/tickers", async (req, res) => {
  try {
    const tickers = await Ticker.find(); // Fetch data from the database
    res.json(tickers); // Send data to the client
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from database" });
  }
});

app.use(express.static(path.join(__dirname, "/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
