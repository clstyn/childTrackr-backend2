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
      // Use a regular expression to add password validation rules
      validate: {
        validator: function (password) {
          // At least 1 uppercase letter, 1 lowercase letter, and 1 digit
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
          return regex.test(password);
        },
        message:
          "Password must be at least 8 characters long and contain at least 1 uppercase letter and 1 digit.",
      },
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
