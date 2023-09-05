const pool = require("../db");

// Create a new inventory item
const createInventoryItem = async (req, res) => {
  try {
    const { description, quantity, unit, consumed } = req.body;
    const newInventory = await pool.query(
      "INSERT INTO inventory (description, quantity, unit, consumed) VALUES ($1, $2, $3, $4) RETURNING *",
      [description, quantity, unit, consumed]
    );
    res.json(newInventory.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error:
        "An error occurred while processing the request. Please make sure not typing in the same item twice.",
    });
  }
};

// Get all inventory items
const getAllInventoryItems = async (req, res) => {
  try {
    const allInventoryItems = await pool.query("SELECT * FROM inventory");
    res.json(allInventoryItems.rows);
  } catch (err) {
    console.error(err.message);
  }
};

// Get a specific inventory item by ID
const getInventoryItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const inventoryItem = await pool.query(
      "SELECT * FROM inventory WHERE inventory_id = $1",
      [id]
    );
    res.json(inventoryItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

// Update an inventory item by ID (quantity and consumed)
const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const currentItem = await pool.query(
      "SELECT consumed FROM inventory WHERE inventory_id = $1",
      [id]
    );
    const { consumed } = currentItem.rows[0];
    const updateInventory = await pool.query(
      "UPDATE inventory SET (quantity, consumed) = ($1, $2) WHERE inventory_id = $3",
      [quantity, consumed, id]
    );
    res.json("Inventory was updated.");
  } catch (err) {
    console.error(err.message);
  }
};

// Update an inventory item's consumed status by ID
const updateConsumedStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { consumed } = req.body;
    const updateConsumed = await pool.query(
      "UPDATE inventory SET consumed = $1 WHERE inventory_id = $2",
      [consumed, id]
    );
    res.json("Consumed status was updated.");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete an inventory item by ID
const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteInventory = await pool.query(
      "DELETE FROM inventory WHERE inventory_id = $1",
      [id]
    );
    res.json("Inventory item was deleted.");
  } catch (err) {
    console.error(err.message);
  }
};

// Delete all inventory items
const deleteAllInventoryItems = async (req, res) => {
  try {
    const deleteAllInventory = await pool.query("DELETE FROM inventory");
    res.status(200).send("All items were deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting items.");
  }
};

module.exports = {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  updateConsumedStatus,
  deleteInventoryItem,
  deleteAllInventoryItems,
};
