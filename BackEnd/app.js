const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  updateConsumedStatus,
  deleteInventoryItem,
  deleteAllInventoryItems,
} = require("./controller/controller_inventory");

// ... (other code remains the same)

async function checkAndCreateInventoryTable() {
  try {
    const result = await pool.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'inventory')"
    );

    if (!result.rows[0].exists) {
      await pool.query(`
          CREATE TABLE inventory (
            inventory_id SERIAL PRIMARY KEY,
            description VARCHAR(255) UNIQUE,
            consumed BOOLEAN,
            quantity INTEGER,
            unit VARCHAR(20)
          )
        `);

      console.log("Inventory table created.");
    }
  } catch (error) {
    console.error("Error checking or creating inventory table:", error);
  }
}

checkAndCreateInventoryTable();

//middleware
app.use(cors());
app.use(express.json());

// Routers

app.post("/inventory", createInventoryItem);
app.get("/inventory", getAllInventoryItems);
app.get("/inventory/:id", getInventoryItemById);
app.put("/inventory/:id", updateInventoryItem);
app.put("/inventory/:id/consumed", updateConsumedStatus);
app.delete("/inventory/:id", deleteInventoryItem);
app.delete("/inventory", deleteAllInventoryItems);

// ... (other code remains the same)

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
