import React from "react";
import { useState } from "react";
import Item from "./Item";

export default function InventoryList({
  items,
  onDeleteItem,
  onUpdateQuantity,
  onToggleItems,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "consumed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.consumed) - Number(b.consumed));

  return (
    <div className="list">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Consumed</th>
            <th>Item</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <Item
              item={item}
              onDeleteItem={onDeleteItem}
              onUpdateQuantity={onUpdateQuantity}
              onToggleItems={onToggleItems}
              key={item.id}
            />
          ))}
        </tbody>
      </table>
      <div className="filter">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="consumed">Sort by consumed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
