const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: function (password) {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
          return regex.test(password);
        },
        message:
          "Password must be at least 8 characters long and contain at least 1 uppercase letter and 1 digit.",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
