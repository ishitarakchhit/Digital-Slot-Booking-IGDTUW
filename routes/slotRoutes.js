const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createSlotController,
  getSlotController,
} = require("../controllers/slotController");

const router = express.Router();

// Add Slot Route
router.post("/create-slot", authMiddleware, createSlotController);

// Get All Slots by Status Route
router.get("/get-slots", authMiddleware, getSlotController);

module.exports = router;
