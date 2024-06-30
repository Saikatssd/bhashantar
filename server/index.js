// require("dotenv").config({ path: "./config.env" });
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const authRoutes = require("./routes/authRoutes");
// const errorMiddlware = require("./middleware/errorMiddleware.js");
// // const initializeDefaults = require('./utils/seeder.js')
// const connectDatabase = require("./Database/Database.js");

// connectDatabase();

// const app = express();
// app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
// app.use(express.urlencoded({ extended: true, limit: "30kb" }));

// app.use(cookieParser());

// app.use("/users", authRoutes);

// app.use(errorMiddlware);

// app.get("/", (req, res) => {
//   res.send("Backend is Running Successfully");
// });

// const PORT = process.env.PORT || 5566;
// app.listen(PORT, () => {
//   console.log(`Server started on PORT: ${PORT} `);
// });

// // app.listen(PORT,
// //   console.log(`Server running on port http://localhost:${PORT} in ${process.env.NODE_ENV} mode`)
// // )

require("dotenv").config({ path: "./config.env" });
const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const documentRoutes = require("./routes/documentRoutes.js");
const errorMiddlware = require("./middleware/errorMiddleware.js");
const connectDatabase = require("./Database/Database.js");
const Document = require("./models/document.js");

connectDatabase();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: "30kb" }));

app.use(cookieParser());

app.use("/users", authRoutes);
app.use("/project", projectRoutes);
app.use("/document", documentRoutes);

app.use(errorMiddlware);

app.get("/", (req, res) => {
  res.send("Backend is Running Successfully");
});

const PORT = process.env.PORT || 5566;
const server = app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT} `);
});

// Socket.io integration
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}

