const slotModel = require("../models/slotModel");
const userModel = require("../models/userModel");
const dotenv = require("dotenv");

// CREATE SLOT
const createSlotController = async (req, res) => {
  try {
    const { email, issuerName } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    if (user.name !== issuerName) {
      throw new Error("Please use your name");
    }

    // Add userId to the request body
    req.body.userId = user._id;
    //save record
    const slot = new slotModel(req.body);
    await slot.save();
    return res.status(201).send({
      success: true,
      message: "New Slot Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Creating Slot API",
      error,
    });
  }
};

// GET ALL SLOTS BY STATUS
const getSlotController = async (req, res) => {
  try {
    let { status } = req.params;
    const { userId } = req.body;
    status = String(status);
    console.log("Status type:", typeof status);
    console.log("Query Params:", req.query); // Debugging line

    // Validate the status
    const validStatuses = ["pending", "approved", "declined", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid status provided",
      });
    }

    const adminUserId = req.user._id.toString();

    // Check if the user is an admin
    if (adminUserId === process.env.ADMIN_USER_ID) {
      console.log("Accessing all slots from admin");
      // If the user is an admin, fetch all slots with the specified status
      const slots = await slotModel.find({ status }).sort({ createdAt: -1 });
      return res.status(200).send({
        success: true,
        message: "Get all slots successfully",
        slots,
      });
    }

    // Use req.user to filter slots by the current user's ID
    const slots = await slotModel
      .find({ status, issuerName: req.user.name })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Get all slots successfully",
      slots,
    });
  } catch (error) {
    console.error("Error in getSlotController:", error); // Log the full error
    return res.status(500).send({
      success: false,
      message: "Error in getting slots",
      error: error.message || error, // Include the error message
    });
  }
};

// GET SLOT COUNTS BY STATUS
const getSlotCountController = async (req, res) => {
  try {
    const userId = req.user._id;

    const counts = await slotModel.aggregate([
      { $match: { issuerName: req.user.name } },
      {
        $group: {
          _id: null,
          pendingCount: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
          approvedCount: {
            $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] },
          },
          declinedCount: {
            $sum: { $cond: [{ $eq: ["$status", "declined"] }, 1, 0] },
          },
          cancelledCount: {
            $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
          },
        },
      },
    ]);

    return res.status(200).send({
      success: true,
      counts: counts[0] || {
        pendingCount: 0,
        approvedCount: 0,
        declinedCount: 0,
        cancelledCount: 0,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting slot counts",
      error,
    });
  }
};

const updateSlotStatusController = async (req, res) => {
  console.log("Route hit"); // Add this line
  console.log("updateSlotStatusController reached");
  try {
    const { slotId } = req.params;
    const { status } = req.body;
    const userId = req.user._id.toString(); // Assume req.user contains the authenticated user's information
    console.log(slotId);
    console.log(status);

    // Validate the status
    const validStatuses = ["pending", "approved", "declined", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid status provided",
      });
    }

    // Find the slot by ID
    const slot = await slotModel.findById(slotId);

    if (!slot) {
      return res.status(404).send({
        success: false,
        message: "Slot not found",
      });
    }

    // Check if the user is an admin or a regular user
    const isAdmin = req.user._id.toString() === process.env.ADMIN_USER_ID;

    if (isAdmin) {
      // Admin can only update status from pending to approved or declined
      if (
        slot.status === "approved" ||
        slot.status === "declined" ||
        slot.status === "cancelled"
      ) {
        return res.status(403).send({
          success: false,
          message: "Admin cannot update this status",
        });
      }
      if (status !== "approved" && status !== "declined") {
        return res.status(400).send({
          success: false,
          message: "Admin can only update status to approved or declined",
        });
      }
    } else {
      // User can only update their own slot status from pending to cancelled
      if (slot.issuerName !== req.user.name) {
        return res.status(403).send({
          success: false,
          message: "You are not authorized to update this slot",
        });
      }
      if (slot.status === "approved" || slot.status === "cancelled") {
        return res.status(403).send({
          success: false,
          message: "User cannot update this status",
        });
      }
      if (status !== "cancelled") {
        return res.status(400).send({
          success: false,
          message: "User can only update status to cancelled",
        });
      }
    }

    // Update the slot status
    const updatedSlot = await slotModel.findByIdAndUpdate(
      slotId,
      { status },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Slot status updated successfully",
      slot: updatedSlot,
    });
  } catch (error) {
    console.error("Error updating slot status:", error);
    return res.status(500).send({
      success: false,
      message: "Error updating slot status",
      error,
    });
  }
};

const editSlotController = async (req, res) => {
  console.log("Route hit"); // Debugging line
  console.log("updateSlotController reached");
  try {
    const { slotId } = req.params;
    const updates = req.body;
    const userId = req.user._id.toString(); // Assume req.user contains the authenticated user's information

    // Find the slot by ID
    const slot = await slotModel.findById(slotId);

    if (!slot) {
      return res.status(404).send({
        success: false,
        message: "Slot not found",
      });
    }

    // Ensure that the user is the issuer of the slot
    if (slot.issuerName !== req.user.name) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to update this slot",
      });
    }

    // Check if the user is trying to update the status
    if (updates.status) {
      return res.status(403).send({
        success: false,
        message: "You cannot update the status of your own slot",
      });
    }

    // Allow status updates only if the current status is pending for admin
    if (req.user.role === "admin" && updates.status) {
      // Validate status if admin
      const validStatuses = ["pending", "approved", "declined", "cancelled"];
      if (!validStatuses.includes(updates.status)) {
        return res.status(400).send({
          success: false,
          message: "Invalid status provided",
        });
      }

      // Check if the status change is allowed
      if (slot.status === "approved" || slot.status === "cancelled") {
        return res.status(403).send({
          success: false,
          message: "Cannot update slots that are approved or cancelled",
        });
      }

      // Allow status change if the current status is pending
      if (slot.status !== "pending") {
        return res.status(403).send({
          success: false,
          message: "You can only update the status of pending slots",
        });
      }
    }

    // Update the slot, excluding status changes if user
    const updatedSlot = await slotModel.findByIdAndUpdate(slotId, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).send({
      success: true,
      message: "Slot updated successfully",
      slot: updatedSlot,
    });
  } catch (error) {
    console.error("Error updating slot:", error);
    return res.status(500).send({
      success: false,
      message: "Error updating slot",
      error,
    });
  }
};

module.exports = {
  createSlotController,
  getSlotController,
  getSlotCountController,
  updateSlotStatusController,
  editSlotController,
};
