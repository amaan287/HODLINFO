const express = require("express");
const axios = require("axios");
const cors = require("cors");

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
