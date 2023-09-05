import React from "react";
import { useState, useEffect } from "react";

export default function Item({
  item,
  onDeleteItem,
  onUpdateQuantity,
  onToggleItems,
}) {
  const [editedQuantity, setEditedQuantity] = useState(item.quantity);

  useEffect(() => {
    // Update the edited quantity when the item's quantity changes
    setEditedQuantity(item.quantity);
  }, [item]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setEditedQuantity(newQuantity);
  };

  const handleUpdateQuantity = async (e) => {
    e.preventDefault();
    const updatedQuantity = editedQuantity;
    try {
      const body = { quantity: updatedQuantity };
      console.log(body);
      const response = await fetch(
        `http://localhost:5000/inventory/${item.inventory_id}`,
        {
          method: "PUT",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      onUpdateQuantity(item.inventory_id, editedQuantity);
      // window.location = "/inventory";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <tr key={item.inventory_id}>
      <td>
        <input
          type="checkbox"
          value={item.consumed}
          onChange={() => onToggleItems(item.inventory_id)}
        />
      </td>
      <td>
        <span style={item.consumed ? { textDecoration: "line-through" } : {}}>
          <input
            className="item-quantity-inventory"
            type="number"
            value={editedQuantity}
            onChange={handleQuantityChange}
          />
          {/* <button onClick={updateItemQuantity}>Update Quantity</button> */}
          {item.unit} {item.description}
        </span>
      </td>
      <td>
        <button
          className="delete"
          onClick={() => onDeleteItem(item.inventory_id)}
        >
          ❌
        </button>
      </td>
      <td>
        <button className="update" onClick={handleUpdateQuantity}>
          Update Quantity
        </button>
      </td>
    </tr>
  );
}
