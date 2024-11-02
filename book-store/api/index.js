const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const path = require("path");
app.use(express.json());

const dbPath = path.join(__dirname, "login.db");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3005, () => {
      console.log("server is running on http://localhost:3005");
    });
  } catch (e) {
    console.log(`db error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.post("/api/users", async (req, res) => {
  const { name, address, email, phone } = req.body;

  // Validate the received data
  if (!name || !address || !email || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO users (`name`,`address`,`email`,`phone`) VALUES (?,?,?,?)";
  const values = [name, address, email, phone];

  try {
    await db.run(sql, values);

    // Forward the request to GoRest API
    const url = "https://gorest.co.in/public-api/users";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer 262a92254071a95568d328b153edf8570d3a6412a382dffee509c7f431839c7d", // Keep the token here in backend
      },
      body: JSON.stringify({ name, address, email, phone }),
    };

    // Send request to GoRest API
    const apiResponse = await fetch(url, options);
    const jsonData = await apiResponse.json();

    // Send response from GoRest API back to the client
    response.status(apiResponse.status).json(jsonData);
  } catch (err) {
    console.error("Error:", err);
    response.status(500).json({ error: err.message });
  }
});


module.exports = app; // Export the app for Vercel