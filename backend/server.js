const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(
  cors({
    origin: "https://bookstore-website-frontend.vercel.app/login",
    method: ["POST", "GET", "PUT", "DELETE","OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.options("*", cors()); // Enable CORS for all routes

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

const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "MY_SECRET_KEY", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        request.name = payload.name;
        next();
      }
    });
  }
};

// USER DETAILS WHILE PLACING ORDER
app.post("/users", authenticateToken,async (request, response) => {
  const { name, address, email, phone } = request.body;

  // Validate the received data
  if (!name || !address || !email || !phone) {
    return response.status(400).json({ error: "All fields are required" });
  }

  const selectUserQuery=`SELECT * FROM users WHERE email='${email}'`
  const dbUser=await db.get(selectUserQuery)

  if (dbUser === undefined) {
    const userId = uuid.v4();
    const sql=`INSERT INTO users(id,name,address,email,phone) VALUES(
    '${userId}',
    '${name}',
    '${address}',
    '${email}',
    '${phone}'
    )`
    await db.run(sql)
    response.status(200).json({ message: "User created successfully" });
  } else {
    return response.status(400).json({ error: "User already exists" });
  }
});

//USER REGISTRATION
app.post("/register", async (request, response) => {
  const { username, password } = request.body;

  const selectUserQuery=`SELECT * FROM user_registration WHERE username='${username}'`
  const dbUser=await db.get(selectUserQuery)
  if (dbUser === undefined) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuid.v4();

  const query=`INSERT INTO user_registration(id,username,password) VALUES(
  '${userId}',
  '${username}',
  '${hashedPassword}'
  ) `
   await db.run(query)
    response.status(200).json({ message: "User created successfully" });
  } else {
    return response.status(400).json({ error: "User already exists" });
  }
});

// USER LOGIN API
app.post("/login", async (request, response) => {
  const { username, password } = request.body;

  const selectUserQuery=`SELECT * FROM user_registration WHERE username='${username}'`
  const dbUser=await db.get(selectUserQuery)

  if (dbUser === undefined) {
    return response.status(400).json({ error_msg: "Invalid username" });
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched === true) {
      const payload = {
        username: username,
      };
      const jwtToken = jwt.sign(payload, "MY_SECRET_KEY");
      response.status(200).json({ jwtToken });
    } else {
      return response.status(400).json({ error_msg: "Invalid password" });
    }
  }
});
