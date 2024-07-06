const validator = require("validator");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const Registration = require("../models/userModel");
const UserProfile = require("../models/userProfileModel");

async function registerUser(req, res) {
  try {
    const { username, password, email } = req.body;

    const normalizedEmail = email.toLowerCase();

    const existingEmail = await Registration.findOne({
      email: normalizedEmail,
    });

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email tidak valid!" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(401).json({
        message:
          "Password harus terdiri dari minimal 8 karakter, 1 huruf besar, 1 huruf kecil, dan 1 angka",
      });
    }

    const registration = await Registration.create({
      username: username,
      password: hashedPassword,
      email: normalizedEmail,
    });

    const transporter = req.app.get("transporter");

    const mailOptions = {
      from: "Verifikasi email Andal-APP <test@mfarizalpasha@gmail.com>",
      to: normalizedEmail,
      subject: "Verifikasi Email",
      text:
        "Terima kasih telah mendaftar. Klik tautan berikut untuk verifikasi email Anda: https://child-trackr-backend2.vercel.app/user/verify/" +
        registration._id,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email terkirim: " + info.response);
      }
    });

    res.status(200).json(registration);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await Registration.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ isAuthenticated: false, message: "Pengguna tidak ditemukan" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        if (user.isVerified) {
          const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: "1d",
          });
          res
            .status(200)
            .json({ isAuthenticated: true, token, username: user.username });
        } else {
          res
            .status(401)
            .json({
              isAuthenticated: false,
              message: "Email belum terverifikasi",
            });
        }
      } else {
        res
          .status(401)
          .json({
            isAuthenticated: false,
            message: "Password yang anda masukkan salah!",
          });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function getUserProfiles(req, res) {
  try {
    const userProfiles = await UserProfile.find();
    res.status(200).json(userProfiles);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan dalam mengambil data User Profile." });
  }
}

async function getUserLogin(req, res) {
  try {
    const registration = await Registration.find({});
    res.status(200).json(registration);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function addUserProfile(req, res) {
  try {
    const { username, name, latitude, longitude } = req.body;

    const newProfile = await UserProfile.create({
      username,
      name,
      latitude,
      longitude,
    });

    res.status(200).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteUserProfile(req, res) {
  try {
    const { id } = req.params;

    await UserProfile.findByIdAndDelete(id);

    res.status(200).json({ message: "User profil berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function verificationEmail(req, res) {
  try {
    const { id } = req.params;
    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    console.log(registration);

    registration.isVerified = true;
    await registration.save();

    res.status(200).json({ message: "Email berhasil diverifikasi" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function getLoggedInUser(req, res) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ isAuthenticated: false, message: "Token tidak temukan" });
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ isAuthenticated: false, message: "Token Salah" });
      }

      const user = await Registration.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      res.status(200).json({ isAuthenticated: true, user: user });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfiles,
  addUserProfile,
  deleteUserProfile,
  getUserLogin,
  verificationEmail,
  getLoggedInUser,
};
