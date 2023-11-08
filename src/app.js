const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./utils/db");
require("dotenv").config();
const cors = require("cors");
// const session = require("express-session");

const userRoutes = require("./routes/userRoutes");
const childRoutes = require("./routes/childRoutes");
const geofenceRoutes = require("./routes/geofenceRoutes");
const history = require("./routes/geofenceHistoryRoutes");
const notif = require("./routes/notificationRoutes");

const nodemailer = require("nodemailer");

// const admin = require("firebase-admin");
// const serviceAccount = require("./firebase.messaging.sw"); // Sesuaikan dengan lokasi file konfigurasi Anda

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mfarizalpasha@gmail.com", // Ganti dengan alamat email Anda
    pass: "vdfmgeuueauabtuy", // Ganti dengan kata sandi email Anda
  },
});

const app = express();

app.use(cors());

// Gunakan transporter untuk mengirim email
app.set("transporter", transporter);

// Menggunakan body-parser untuk mengurai permintaan JSON
app.use(bodyParser.json());

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET, // Gantilah dengan kunci sesi Anda
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 60 * 60 * 1000, // Lama sesi dalam milidetik (1 jam)
//     },
//   })
// );

// // Middleware yang memeriksa sesi pengguna
// app.use((req, res, next) => {
//   if (req.session.userId) {
//     // Pengguna telah masuk, Anda dapat memberikan akses ke rute tertentu.
//     next();
//   } else {
//     // Pengguna belum masuk atau sesi kadaluwarsa, arahkan ke halaman login atau lakukan tindakan lain sesuai kebijakan Anda.
//     res
//       .status(401)
//       .json({ isAuthenticated: false, message: "User not authenticated" });
//   }
// });

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Gunakan rute yang telah Anda buat
app.use("/user", userRoutes);
app.use("/child", childRoutes);

// Menggunakan rute Geofence
app.use("/geofence", geofenceRoutes);

app.use("/history", history);
app.use("/notif", notif);

app.get("/", (req, res) => {
  res.send("Welcome to ChildTrackr API!");
});

// Jalankan server pada port tertentu
const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
});
