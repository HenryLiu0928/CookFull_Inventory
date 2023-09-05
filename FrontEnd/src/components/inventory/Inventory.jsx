import React from "react";
import { useState, useEffect } from "react";
import Form from "./Form";
import InventoryList from "./InventoryList";
import Item from "./Item";
// import { useLocalStorageState } from "./useLocalStorageState";

import { Header } from "../common/Header";

import "../styles/inventory.css";

export const Inventory = () => {
  // const [items, setItems] = useState([]);
  const [items, setItems] = useState([]);
  //   const storedValue = localStorage.getItem("items");
  //   return JSON.parse(storedValue) || [];
  // });

  const getInventoryItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/inventory");
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getInventoryItems();
  }, []);

  // console.log(items);

  //   localStorage.setItem("items", JSON.stringify(items));
  // }, [items]);

  // const [instock, setInstock] = useLocalStorageState([], "instock");

  // console.log(instock);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  async function handleDeleteItem(id) {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/inventory/${id}`, {
        method: "DELETE",
      });
      setItems(items.filter((item) => item.inventory_id !== id));
    } catch (err) {
      console.error(err.message);
    }

    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleUpdateQuantity(id, newQuantity) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    window.alert("Quantity updated successfully!");
  }
  async function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) {
      try {
        const response = await fetch("http://localhost:5000/inventory", {
          method: "DELETE",
        });

        if (response.ok) {
          // Items were successfully deleted
          setItems([]); // Clear the items state or update as needed
          window.alert("All items were deleted successfully.");
        } else {
          // Handle error case
          window.alert("An error occurred while deleting items.");
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  async function handleToggleItem(id) {
    try {
      const response = await fetch(`http://localhost:5000/inventory/${id}`);
      const currentItem = await response.json();
      const currentConsumed = currentItem.consumed;

      // Toggle the consumed status
      const updatedConsumed = !currentConsumed;
      const body = { consumed: updatedConsumed };
      const toggleConsume = await fetch(
        `http://localhost:5000/inventory/${id}/consumed`,
        {
          method: "PUT",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      setItems((items) =>
        items.map((item) =>
          item.inventory_id === id
            ? { ...item, consumed: !item.consumed }
            : item
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <header className="header">
        <Header />
        <div className="inventory-wrapper">
          <h2 className="title">What ingredients do you have?</h2>
          <blockquote>
            In your fridge, freezer, and pantry.
            <br />
          </blockquote>
          <Form onAddItems={handleAddItems} />
          <InventoryList
            items={items}
            onDeleteItem={handleDeleteItem}
            onUpdateQuantity={handleUpdateQuantity}
            onToggleItems={handleToggleItem}
            onClearList={handleClearList}
          />
        </div>
      </header>
    </>
  );
};
