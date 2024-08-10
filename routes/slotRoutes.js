const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createSlotController,
  getSlotController,
  getSlotCountController,
  updateSlotStatusController,
  editSlotController,
} = require("../controllers/slotController");

const router = express.Router();

// Add Slot Route
router.post("/create-slot", authMiddleware, createSlotController);

// Get All Slots by Status Route
router.get("/get-slots/:status", authMiddleware, getSlotController);

// Get All Slots Count Route
router.get("/get-slot-count", authMiddleware, getSlotCountController);

router.put("update-slot/:slotId", authMiddleware, editSlotController);

// update status
router.put(
  "/update-status/:slotId",
  authMiddleware,
  updateSlotStatusController
);

module.exports = router;
