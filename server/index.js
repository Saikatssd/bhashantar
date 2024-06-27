require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const errorMiddlware = require("./middleware/errorMiddleware.js");
// const initializeDefaults = require('./utils/seeder.js')
const connectDatabase = require("./Database/Database.js");

connectDatabase();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: "30kb" }));

app.use(cookieParser());

app.use("/users", authRoutes);

app.use(errorMiddlware);

app.get("/", (req, res) => {
  res.send("Backend is Running Successfully");
});

const PORT = process.env.PORT || 5566;
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT} `);
});

// app.listen(PORT,
//   console.log(`Server running on port http://localhost:${PORT} in ${process.env.NODE_ENV} mode`)
// )
