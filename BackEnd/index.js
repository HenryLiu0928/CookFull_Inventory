// NOT IN USE
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pool = require("./db");

// //create new table if inventory table does not exist
// async function checkAndCreateInventoryTable() {
//   try {
//     const result = await pool.query(
//       "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'inventory')"
//     );

//     if (!result.rows[0].exists) {
//       await pool.query(`
//         CREATE TABLE inventory (
//           inventory_id SERIAL PRIMARY KEY,
//           description VARCHAR(255) UNIQUE,
//           consumed BOOLEAN,
//           quantity INTEGER,
//           unit VARCHAR(20)
//         )
//       `);

//       console.log("Inventory table created.");
//     }
//   } catch (error) {
//     console.error("Error checking or creating inventory table:", error);
//   }
// }

// checkAndCreateInventoryTable();

// //middleware
// app.use(cors());
// app.use(express.json());

// //Routers

// //Create a inventory

// app.post("/inventory", async (req, res) => {
//   try {
//     const { description, quantity, unit, consumed } = req.body;
//     const newInventory = await pool.query(
//       "INSERT INTO inventory (description, quantity, unit, consumed) VALUES ($1, $2, $3, $4) RETURNING *",
//       [description, quantity, unit, consumed]
//     );
//     res.json(newInventory.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({
//       error:
//         "An error occurred while processing the request. Please make sure not typing in the same item twice.",
//     });
//   }
// });

// //Get all inventory

// app.get("/inventory", async (req, res) => {
//   try {
//     const allInventoryItems = await pool.query("SELECT * FROM inventory");
//     res.json(allInventoryItems.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //Get a inventory item
// app.get("/inventory/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const inventoryItem = await pool.query(
//       "SELECT * FROM inventory WHERE inventory_id = $1",
//       [id]
//     );
//     res.json(inventoryItem.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //Update a inventory item by quantity
// app.put("/inventory/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantity } = req.body;
//     const currentItem = await pool.query(
//       "SELECT consumed FROM inventory WHERE inventory_id = $1",
//       [id]
//     );
//     const { consumed } = currentItem.rows[0];
//     const updateInventory = await pool.query(
//       "UPDATE inventory SET ( quantity, consumed) =  ($1, $2) WHERE inventory_id = $3",
//       [quantity, consumed, id]
//     );
//     res.json("Inventory was updated.");
//   } catch (err) {
//     console.error(err.message);
//   }
// });
// //Update a inventory item by consumed
// app.put("/inventory/:id/consumed", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { consumed } = req.body;

//     const updateConsumed = await pool.query(
//       "UPDATE inventory SET consumed = $1 WHERE inventory_id = $2",
//       [consumed, id]
//     );

//     res.json("Consumed status was updated.");
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "Server error" });
//   }
// });
// //Delete a inventory item

// app.delete("/inventory/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteInventory = await pool.query(
//       "DELETE FROM inventory WHERE inventory_id = $1",
//       [id]
//     );
//     res.json("Inventory item was deleted.");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //DELETE all inventory items

// app.delete("/inventory", async (req, res) => {
//   try {
//     const deleteAllInventory = await pool.query("DELETE FROM inventory");
//     res.status(200).send("All items were deleted successfully.");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while deleting items.");
//   }
// });

// app.listen(5000, () => {
//   console.log("server has started on port 5000");
// });
