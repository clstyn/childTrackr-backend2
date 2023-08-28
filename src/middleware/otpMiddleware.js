// middleware/otpMiddleware.js
const otpGenerator = require("otp-generator"); // Menggunakan pustaka otp-generator
const nodemailer = require("nodemailer"); // Menggunakan pustaka nodemailer
const sgMail = require("@sendgrid/mail");

// Mengatur API key SendGrid, Anda harus mendapatkan API key SendGrid dari akun Anda
sgMail.setApiKey("YOUR_SENDGRID_API_KEY");

// Fungsi untuk mengirim OTP code ke alamat email
const sendOTP = (email, otpCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_gmail_account@gmail.com",
      pass: "your_gmail_account_password",
    },
  });

  const mailOptions = {
    from: "mfarizalpasha@gmail.com",
    to: email,
    subject: "Verifikasi OTP Code",
    text: `Kode OTP Anda adalah: ${otpCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Middleware untuk memverifikasi OTP code
const verifyOTP = (req, res, next) => {
  const { email, otpCode } = req.body;

  // Anda perlu mengganti ini dengan kode yang benar untuk mengambil OTP code yang tersimpan dari basis data atau penyimpanan sementara.
  const storedOTPCode = getStoredOTPCodeFromDatabase(email);

  if (otpCode === storedOTPCode) {
    // Verifikasi berhasil, token OTP code diterima
    // Anda juga perlu mempertimbangkan untuk mengatur batas waktu verifikasi di sini
    // Contoh, kita set status verifikasi menjadi "verified"
    req.user.isOTPVerified = true;
    next();
  } else {
    // Verifikasi gagal, kirimkan respon error
    res
      .status(403)
      .json({ error: "Verifikasi OTP code gagal. Akses ditolak." });
  }
};

// Example function to get OTP code from the database (Replace this with your actual database query)
const getStoredOTPCodeFromDatabase = (email) => {
  // Assuming you have a collection/table named "users" in your database
  // and you have a field named "otpCode" to store the OTP code for each user

  // Replace the following with your actual database query to retrieve the stored OTP code
  // Example: return db.collection('users').findOne({ email: email }).otpCode;
  const users = [
    { email: "ibuketiga@gmail.com", otpCode: "123456" },
    // Add other user data here...
  ];

  const user = users.find((user) => user.email === email);
  if (user) {
    return user.otpCode;
  } else {
    return null;
  }
};

module.exports = { sendOTP, verifyOTP };
