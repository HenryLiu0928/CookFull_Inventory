const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const inventoryRoutes = require("./routes/inventory_routes"); // Import the inventory routes file
// Import other route files as needed

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

// Middleware
app.use(cors());
app.use(express.json());

// Use the inventory routes
app.use("/inventory", inventoryRoutes);

// Use other routes as needed

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
