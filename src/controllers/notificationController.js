const Notification = require("../models/notificationModel");

async function saveNotificationData(req, res) {
  try {
    const { username, status } = req.body;

    if (!username || !status) {
      return res.status(400).json({ error: "Semua kolom harus diisi" });
    }

    const newNotification = new Notification({
      username,
      status,
    });

    await newNotification.save();
    res.status(201).json({ message: "Data Notifikasi berhasil disimpan" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menyimpan data notifikasi" });
  }
}

async function getNotificationData(req, res) {
  try {
    const notification = await Notification.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data Notifikasi" });
  }
}

async function getNotificationsByUsername(req, res) {
  const { username } = req.params;

  try {
    const notifications = await Notification.find({ username }).sort({
      createdAt: -1,
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
}

module.exports = {
  saveNotificationData,
  getNotificationData,
  getNotificationsByUsername,
};
