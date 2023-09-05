const express = require("express");
const router = express.Router();
const {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  updateConsumedStatus,
  deleteInventoryItem,
  deleteAllInventoryItems,
} = require("../controller/inventory_controller");

// Routes for inventory
router.post("/", createInventoryItem);
router.get("/", getAllInventoryItems);
router.get("/:id", getInventoryItemById);
router.put("/:id", updateInventoryItem);
router.put("/:id/consumed", updateConsumedStatus);
router.delete("/:id", deleteInventoryItem);
router.delete("/", deleteAllInventoryItems);

module.exports = router;
