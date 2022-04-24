const express = require("express");
const cors = require('cors')
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

// const Chat = require("./models/Chat");
const { Server } = require("socket.io");
const http = require("http");


dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// ---------------------------------------------------------------------
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
  origin: "http://localhost",
  methods: ["GET", "POST"],
},
});

io.on("connection", (socket) => {
console.log(`User Connected: ${socket.id}`);

socket.on("join_room", (data) => {
  socket.join(data);
  console.log(`User with ID: ${socket.id} joined room: ${data}`);
});

socket.on("send_message", (data) => {
  socket.to(data.room).emit("receive_message", data);
});



// app.get("/chats", async (request, response) => {
//   const messageData = await Chat.find({});

//   try {
//     response.send(messageData);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

// app.post("/chats", async (req, res) => {
//   const messageData = new Chat(req.body);
//   console.log("hoyeche");
//   try {
//     const savedChats = await messageData.save();
//     console.log("hoyeche 2");
//     res.send(savedChats);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.post("/chats", async (req, res) => {
//   console.log(req.body);
//   const {messageData} = req.body;
//   const newChat = new Chat(messageData);

//   try {
//     const savedChat = await newChat.save();
//     res.status(200).json(savedChat);
//   } catch(err){
//     res.status(500).json(err);
//   }
// });


socket.on("disconnect", () => {
  console.log("User Disconnected", socket.id);
});
});

// -------------------------------------------------------------------------------

app.use(cors())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

server.listen(3001, () => {
  console.log("socket.io Backend is running.");
});

app.listen("5000", () => {
  console.log("server Backend is running.");
});

