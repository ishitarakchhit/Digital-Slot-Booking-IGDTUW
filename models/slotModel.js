const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is a required field"],
    },
    venue: {
      type: String,
      required: [true, "Venue name is required"],
    },
    society: {
      type: String,
      required: [true, "society name is required"],
    },
    eventName: {
      type: String,
      required: [true, "Event Name is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start Time is required"],
    },
    endTime: {
      type: String,
      required: [true, "End Time is required"],
    },
    issuerName: {
      type: String,
      required: [true, "Issuer Name is required"],
    },
    equipments: {
      type: [String],
    },
    status: {
      type: String,
      required: [true, "Staus is required"],
      enum: ["pending", "approved", "declined", "cancelled"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming 'User' is the name of your user model
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Slot", slotSchema);
