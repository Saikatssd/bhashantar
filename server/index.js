const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/user");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://debmalya:skCH6Mf2bRrhbOSq@cluster0.ue55gpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/login", (req, res) => {
  const { name, password } = req.body;
  userModel
    .findOne({ name })
    .then((user) => {
      if (!user) {
        console.log("User not found");
        return res.json({ message: "404: (User not found)" });
      }
      if (user.password !== password) {
        console.log("401 : (Incorrect password)");
        return res.json({ message: "401 : (Incorrect password)" });
      }
      res.json({ message: "success" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(5566, () => {
  console.log("server is running");
});
