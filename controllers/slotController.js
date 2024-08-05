const slotModel = require("../models/slotModel");
const userModel = require("../models/userModel");

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
    const { status, userId } = req.body;

    // Validate the status
    const validStatuses = ["pending", "approved", "declined", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid status provided",
      });
    }

    //check if userId matches or not
    if (userId !== req.user._id.toString()) {
      return res.status(400).send({
        success: false,
        message: "Invalid userId provided",
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
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting slots",
      error,
    });
  }
};

module.exports = { createSlotController, getSlotController };
