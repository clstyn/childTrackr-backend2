const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./utils/db");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const childRoutes = require("./routes/childRoutes");

// const admin = require("firebase-admin");
// const serviceAccount = require("./firebase.messaging.sw"); // Sesuaikan dengan lokasi file konfigurasi Anda

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

const app = express();

app.use(cors());

// Menggunakan body-parser untuk mengurai permintaan JSON
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Gunakan rute yang telah Anda buat
app.use("/user", userRoutes);
app.use("/child", childRoutes);

// Menggunakan rute Geofence
app.use("/geofence", geofenceRoutes);

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
