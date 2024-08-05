const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      require: [true, "Role is required"],
      enum: ["admin", "student"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "student") {
          return true;
        }
        return false;
      },
    },
    email: {
      type: String,
      require: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
