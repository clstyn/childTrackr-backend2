const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./utils/db");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const childRoutes = require("./routes/childRoutes");

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Menggunakan body-parser untuk mengurai permintaan JSON
app.use(bodyParser.json());

// // Menggunakan route untuk melacak lokasi anak
// const locationController = require("./controllers/locationController");
// app.post("/track", locationController.trackLocation);

// // Rute untuk register dan login
// const authController = require("./controllers/authController");
// app.post("/register", authController.register);
// app.post("/login", authController.login);

// const authMiddleware = require("./middleware/authMiddleware");

// // Rute untuk mengatur geofence oleh orangtua
// app.post("/setGeofence", authMiddleware.authenticateUser, (req, res) => {
//   const { latitude, longitude, radius } = req.body;
//   const user = req.user;

//   if (user.role !== "parent") {
//     return res
//       .status(403)
//       .json({ error: "Anda tidak diizinkan mengakses fitur ini." });
//   }

//   // Simpan data geofence ke database atau lakukan operasi lain yang diinginkan
//   const Geofence = require("./models/Geofence");
//   const geofence = new Geofence({ latitude, longitude, radius });
//   geofence
//     .save()
//     .then(() => {
//       res.status(200).json({ message: "Geofence berhasil diatur." });
//     })
//     .catch((error) => {
//       console.error(error);
//       res
//         .status(500)
//         .json({ error: "Terjadi kesalahan saat mengatur geofence." });
//     });

//   res.status(200).json({ message: "Geofence berhasil diatur." });
// });

// Gunakan rute yang telah Anda buat
app.use("/user", userRoutes);
app.use("/child", childRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Jalankan server pada port tertentu
const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
});
