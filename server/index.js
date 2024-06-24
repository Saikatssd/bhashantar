require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const errorMiddlware = require("./middleware/errorMiddleware.js");

// const userModel = require("./models/user");

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
// mongoose.connect(
//   "mongodb+srv://debmalya:skCH6Mf2bRrhbOSq@cluster0.ue55gpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// );

const DB_URI =
  "mongodb+srv://debmalya:skCH6Mf2bRrhbOSq@cluster0.ue55gpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//for ssd
// const DB_URI = "mongodb://127.0.0.1:27017/bhashantar";

mongoose
  .connect(DB_URI, {})
  .then((connection) => {
    console.log(
      "MongoDB Database connected with HOST:",
      connection.connection.host
    );
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });

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
