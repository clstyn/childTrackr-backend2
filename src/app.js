const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./utils/db");
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");

const userRoutes = require("./routes/userRoutes");
const childRoutes = require("./routes/childRoutes");
const geofenceRoutes = require("./routes/geofenceRoutes");
const history = require("./routes/geofenceHistoryRoutes");
const notif = require("./routes/notificationRoutes");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mfarizalpasha@gmail.com",
    pass: "vdfmgeuueauabtuy",
  },
});

const app = express();

app.use(cors());

app.set("transporter", transporter);

app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/child", childRoutes);
app.use("/geofence", geofenceRoutes);
app.use("/history", history);
app.use("/notif", notif);

app.get("/", (req, res) => {
  res.send("Welcome to ChildTrackr API!");
});

const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
});
